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

  // render the first time to get routing context
  // Would be better if we didn't render this twice, instead the first pass is just the routes
  renderApp(context, store, location)
  const { redirect, missed } = context.getResult()

  if (redirect) return res.redirect(redirect.pathname)

  return Promise.all(store.getState().promises)
    .then(() => {
      res.status(missed ? 404 : 200)
        .render('index', {
          markup: renderApp(context, store, location),
          initialState: JSON.stringify({ ...store.getState(), promises: null })
        })
    })
    .catch((e) => {
      console.error(e)
      res.status(500).render('index', { markup: JSON.stringify(e) })
    })
}
