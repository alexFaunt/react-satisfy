# Title

## TL;DR

Using a component to fetch data can be simple and easy, A demo app employing my suggested approach can be found [here](https://github.com/alexFaunt/redux-satisfy)

## Intro

Rendering server side is essential to a production `React` app. It delivers content to the user much faster, improves SEO, and enables a site to work without JS. To do this with `redux` state management we need to obtain the initial state of all the components being rendered. There are several approaches to achieve this including: manual fetching through the lifecycle, static component properties (`needs`) or [redux-async-connect](https://github.com/Rezonans/redux-async-connect). I'm not going to go into detail of these, but on server side they follow roughly the same procedure:

Render the app or use `react-router`'s `match` to establish the components to be rendered, trigger the actions manually or allow the lifecycle to trigger them, and await the chosen async solution to complete before returning to the user.

Some of the issues with these approaches:
* using the lifecycle means separate statements for initial fetching and upon property changes.
* checking against state to see if you need to update the data can lead to a lot of conditional statements.
* `react-router`'s `match` is no longer available in version 4.

I've been using the static needs property approach until now but wanted to upgrade to `react router` version 4. I also want the fetching of data to be in one place only rather than initial and on change separately. I came up with a new solution - using a component.


## Syncing data using a component

The use of a component may seem unusual when not returning any markup, but it's not unprecedented. Many people use `<Helmet />`, `react-router` v4 introduced `<Redirect />`, and in the past i've used components for analytics tracking `<Analytics />` which has worked nicely.

The solution needs to satisfy 3 requirements
* Fires actions to generate initial state
* Server can access pending actions easily
* Upon changes on the client state is kept in sync

The solution I came up with is the `<Satisfy />` component below. You render it alongside or inside your component, declaring what conditions need to be met, and how to meet them.

If you provide it a condition it will only fire if the condition is not met. You can supply it any other properties, which will be passed on to the action, and upon any of these properties changing it will re-fire the action. Note - if a condition is not provided, it will fire on server, and then on client. However I suggest a condition is always supplied.

### Satisfy component
```javascript
import { Component } from 'react'

export default class Satisfy extends Component {
  componentWillMount() {
    if (typeof this.props.condition === 'undefined' || !this.props.condition) this.fire(this.props)
  }
  shouldComponentUpdate({ condition, children, ...rest }) {
    return typeof this.props.condition === 'undefined'
      ? Object.keys(rest).some((prop) => this.props[prop] !== rest[prop])
      : !condition
  }
  componentWillUpdate(nextProps) {
    this.fire(nextProps)
  }
  fire = ({ action, condition, children, ...rest }) => {
    action(rest)
  }
  render = () => null
}
```
### Usage
```javascript
import React from 'react'
import { connect } from 'react-redux'
import Satisfy from './Satisfy'
import { getProfile as getProfileAction } from '../actions/profileActions'

const Profile = ({ params: { id }, profiles, getProfile }) => {
  const profile = profiles[id]
  const validProfile = (profile && !profile.expired)
  return (
    <div className="Profile">
      <Satisfy condition={ validProfile } action={ getProfile } id={ id } />
      { !validProfile && <div>Profile is loading!</div> }
      { profile && profile.error && <div>Profile failed to load</div> }
      { profile && !profile.error && <div>Profile is loaded: { profile.name }!</div> }
    </div>
  )
}

const mapStateToProps = ({ profiles }) => ({ profiles })
export default connect(mapStateToProps, { getProfile: getProfileAction })(Profile)
```

### Variants

I considered a few variants on this. Using a decorator function to wrap the Profile component, but it gives less flexibility of what can be passed in the condition. Or wrapping the function in a `<Provider>` style component to control these props, but I feel all the props should come from `redux`'s `connect` decorator or it could be confusing. The `<Satisfy />` component offers a lot of flexibility and a declarative approach, and seems robust so far.

## Server render with `react-router` 4

Employing this pattern allows us to fire off the actions needed to populate our app's initial state. `React router` version 4 removed the ability to `match` based on location, and the [documentation](https://react-router.now.sh/ServerRouter) suggests you just render and return.

The issue here is that quite often your actions will not be synchronous, and you need to await their completion before rendering and returning to the user. The solution I have for this works, but I have yet to investigating the performance relative to `react-router` 3.

### Promise middleware

There are many solutions for managing asynchronous actions or side effects such as [sagas](https://github.com/yelouafi/redux-saga), [redux-loop](https://github.com/redux-loop/redux-loop) or [thunk](https://github.com/gaearon/redux-thunk). I've written custom promise middleware, but it could be integrated with any of these. Essentially what needs to happen is the pending actions get reported to a reducer, which can then be accessed on the server.

```javascript
export default () => (next) => (action) => {
  const { promise, success, failure } = action
  if (!promise) return next(action)

  const actionPromise = promise()
  actionPromise.then(
    (result) => next(success(result)),
    (error) => next(failure(error))
  ).catch((error) => {
    console.error('Promise middleware error:', error)
    next(failure(error))
  })

  next({ type: 'AWAIT_PROMISE', promise: actionPromise })
  return actionPromise
}
```

### Promise reducer
This collates all the promises outstanding on the server render only.
```javascript
export default (state = [], { type, promise }) => {
  return !process.browser && type === 'AWAIT_PROMISE' ? state.concat(promise) : state)
}
```

### Promise action
```javascript
import { get } from '../services/api'

export const profileLoaded = (profile) => ({ type: 'PROFILE_LOADED', profile })
export const profileError = (id) => ({ type: 'PROFILE_ERROR', id })
export const getProfile = ({ id }) => ({
  promise: () => api(id),
  success: profileLoaded,
  failure: () => profileError(id)
})
```

### Server side rendering
```javascript
import React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerRouter, createServerRenderContext } from 'react-router'
import { Provider } from 'react-redux'
import path from 'path'

import configureStore from '../utils/configure-store'
import App from '../components/App/App'

const renderApp = (context, store, location) => renderToString(
  <ServerRouter
    location={ location }
    context={ context }
  >
    <Provider store={ store }>
      <App />
    </Provider>
  </ServerRouter>
)

export default (req, res) => {
  const location = req.url
  const store = configureStore({})
  const context = createServerRenderContext()

  // First pass at render
  renderApp(context, store, location)
  const { redirect, missed } = context.getResult()
  if (redirect) return res.redirect(redirect.pathname)

  return Promise.all(store.getState().promises)
    .then(() => {
      res.status(missed ? 404 : 200)
        .render('index', {
          markup: renderApp(context, store, location), // Second render is not desirable
          initialState: JSON.stringify({ ...store.getState(), promises: null })
        })
    })
    .catch((e) => {
      console.error(e)
      res.status(500).render('index', { markup: JSON.stringify(e) })
    })
}
```

### Thoughts

The biggest issue I'm having now is the server rendered - it essentially renders twice, which seems like a big performance issue as it's duplicated execution. What we really need here is something more akin to `match` which calculates the components to be rendered - though i've not done any testing to see what the penalty it is, it might be negligible.

An advanced version of this can use different levels of promise priority, those which are critical must be waited for, others that are optional can be cancelled if taking too long to resolve. This allows you to return as soon as possible even if you have some slower / flaky end points.


## Conclusions

You declare what data you require and how to obtain it, the Satisfy component will ensure it is always present and correct.

I've not analyzed the performance hit the second render pass incurs, but I have no better solution. Any approach using `react-router` 4 is probably facing similar issues with asynchronous dependencies.

This approach allows you to await all the required initial state, offers a high level of flexibility and keeps all the fetching in one place.

I plan to keep using it and will update if hit any further issues. But for now, I'd love feedback, and hope it helps someone!
