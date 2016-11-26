import { awaitPromise } from '../actions/promiseActions'

export default () => (next) => (action) => {
  const { promise, success, failure } = action
  if (!promise) return next(action)

  const actionPromise = promise()
  actionPromise.then(
    (result) => next(success(result)),
    (error) => next(failure(error))
  ).catch((error) => {
    // TODO logger
    console.error('MIDDLEWARE ERROR:', error) // eslint-disable-line
    next(failure(error))
  })

  next(awaitPromise(actionPromise))
  return actionPromise
}
