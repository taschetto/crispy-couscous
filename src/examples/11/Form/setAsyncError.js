import { compose, forEach, path } from 'ramda'

export const setAsyncError = setErrorCallback =>
  compose(
    forEach(({ name, message }) => setErrorCallback(name, { message })),
    path(['response', 'data', 'errors'])
  )
