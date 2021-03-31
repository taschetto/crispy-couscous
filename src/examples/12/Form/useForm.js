import { useCallback } from 'react'
import { useState } from 'react'
import { useForm as useRHForm } from 'react-hook-form'

export const useForm = (...args) => {
  const [formWideError, setFormWideError] = useState('')
  const { handleSubmit: RHFhandleSubmit, ...formProps } = useRHForm(...args)

  /**
   * We need this custom submit handler because, typically, we will use a
   * `mutateAsync` function from `react-query` to submit a form. These functions
   * will throw any errors (422, 500, for example). Since the error is already
   * handled by the mutation itself, we need to prevent this error from leaking.
   *
   * The original handler is exported as `RHFhandleSubmit`.
   *
   * @see {@link https://codesandbox.io/s/blissful-ride-wxxhl?file=/src/App.js}
   * @see {@link https://codesandbox.io/s/30xos?file=/src/App.js}
   */
  const handleSubmit = useCallback(
    onSubmit => RHFhandleSubmit(data => onSubmit(data).catch(() => {})),
    [RHFhandleSubmit]
  )

  return {
    ...formProps,
    formWideError,
    setFormWideError,
    handleSubmit,
    RHFhandleSubmit,
  }
}
