import createReducer from '../utils/create-reducer'
import {
  PROFILE_LOADED,
  PROFILE_ERROR
} from '../actions/profileActions'

export default createReducer({}, {
  [PROFILE_LOADED]: (state, { profile }) => ({
    ...state,
    [profile.id]: profile
  }),
  [PROFILE_ERROR]: (state, { id }) => ({
    ...state,
    [id]: { error: true }
  })
})
