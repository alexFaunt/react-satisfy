export const AWAIT_PROMISE = 'AWAIT_PROMISE'

export const awaitPromise = (promise) => ({
  type: AWAIT_PROMISE,
  promise
})
