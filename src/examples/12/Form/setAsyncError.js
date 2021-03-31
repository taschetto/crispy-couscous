import { __, compose, forEach, identity, ifElse, includes, path } from 'ramda'
import { BAD_REQUEST, UNPROCESSABLE_ENTITY } from 'http-status'

/**
 * A function that receives a `XMLHttpRequest` error object and sets the form
 * errors according to the error type.
 *
 * @callback SetErrorCallback
 * @param {Object} error - the raw `XMLHttpRequest` error object.
 */

/**
 * Received
 * @param {Function} setErrorCallback - The current form `setError` function (returned from `useForm`).
 * @param {Function} setFormWideErrorCallback - The current form `setFormWideError` function (returned from `useForm`).
 * @returns {SetErrorCallback} callback
 */
export const setAsyncError = (
  setErrorCallback,
  setFormWideErrorCallback = identity
) =>
  ifElse(
    isValidationError,
    setValidationErrors(setErrorCallback),
    setFormWideError(setFormWideErrorCallback)
  )

/**
 * Checks if the error type equals to "validation", which comprehends HTTP 400 (Bad Request)
 * and HTTP 422 (Unprocessable Entity).
 */
const isValidationError = compose(
  includes(__, [BAD_REQUEST, UNPROCESSABLE_ENTITY]),
  path(['response', 'status'])
)

const setValidationErrors = setErrorCallback =>
  compose(
    forEach(({ name, message }) =>
      setErrorCallback(name, { type: 'manual', message })
    ),
    path(['response', 'data', 'errors'])
  )

const setFormWideError = setFormWideErrorCallback =>
  compose(setFormWideErrorCallback, path(['response', 'data', 'message']))
