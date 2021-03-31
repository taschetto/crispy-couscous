import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import { instance } from 'api'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
})

export const Example05 = () => {
  const formProps = useForm({ resolver: yupResolver(schema) })
  const { handleSubmit, setError } = formProps

  const onSubmit = async () => {
    try {
      await instance.post('/example05')
    } catch ({ response: { data } }) {
      if (data.firstName) {
        setError('firstName', { message: data.firstName })
      }

      if (data.lastName) {
        setError('lastName', { message: data.lastName })
      }
    }
  }

  return (
    <FormProvider {...formProps}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Example #05 — Dealing with errors from the server</h1>

        <Input name='firstName' defaultValue='John' />

        <Input name='lastName' defaultValue='Doe' />

        <Button type='submit' />
      </form>
    </FormProvider>
  )
}

const Input = ({ name, defaultValue = '' }) => {
  const {
    register,
    formState: { isSubmitting },
    errors,
  } = useFormContext()

  return (
    <>
      <input
        name={name}
        defaultValue={defaultValue}
        ref={register}
        disabled={isSubmitting}
      />
      {errors[name] && <span>{errors[name].message}</span>}
    </>
  )
}

const Button = ({ children = 'Submit', ...props }) => {
  const {
    formState: { isSubmitting },
  } = useFormContext()

  return (
    <button {...props} disabled={isSubmitting}>
      {children}
    </button>
  )
}
