export default (initialState, handlers) => (state, action) => {
  const newState = (state === undefined) ? initialState : state

  return Object.hasOwnProperty.call(handlers, action.type)
    ? handlers[action.type](newState, action)
    : newState
}
