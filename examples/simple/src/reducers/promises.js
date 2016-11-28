import createReducer from '../utils/create-reducer'
import { AWAIT_PROMISE } from '../actions/promiseActions'

export default createReducer([], {
  // Only care on server side or this would just build up forever
  [AWAIT_PROMISE]: (state, promise) => (process.browser ? state : [...state, promise])
})
