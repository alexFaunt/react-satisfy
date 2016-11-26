import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import * as reducers from '../reducers'
import middleware from '../middleware'

const composeEnhancers = process.browser && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose

const enhancer = composeEnhancers(
  applyMiddleware(...middleware)
)

export default (state = {}) => createStore(
  combineReducers(reducers),
  state,
  enhancer
)
