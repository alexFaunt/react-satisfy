export const PROFILE_LOADED = 'PROFILE_LOADED'
export const PROFILE_ERROR = 'PROFILE_ERROR'

// Dummy api action
const api = (id) => new Promise((resolve, reject) => {
  const name = id && id.match(/[A-z]*/)[0]
  if (name) resolve({ id, name })
  else reject()
})

export const profileLoaded = (profile) => ({
  type: PROFILE_LOADED,
  profile
})

export const profileError = (id) => ({
  type: PROFILE_ERROR,
  id
})

export const getProfile = ({ id }) => ({
  promise: () => api(id),
  success: profileLoaded,
  failure: () => profileError(id)
})
