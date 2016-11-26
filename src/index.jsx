import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'

import configureStore from './utils/configure-store'
import App from './components/App/App'

const state = window.__INITIAL_STATE__ // eslint-disable-line
const store = configureStore(state)
const root = document.getElementById('app')

render((
  <BrowserRouter>
    <Provider store={ store }>
      <App />
    </Provider>
  </BrowserRouter>
), root)
