import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import { instance } from 'api'
import { DevTool } from '@hookform/devtools'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
})

export default () => {
  const formProps = useForm({ resolver: yupResolver(schema) })
  const { control, handleSubmit, setError } = formProps

  const onSubmit = async () => {
    try {
      await instance.post('/unprocessable-entity')
    } catch ({
      response: {
        data: { errors },
      },
    }) {
      const firstNameError = errors.find(({ name }) => name === 'firstName')
      if (firstNameError) {
        setError('firstName', { message: firstNameError.message })
      }

      const lastNameError = errors.find(({ name }) => name === 'lastName')
      if (lastNameError) {
        setError('lastName', { message: lastNameError.message })
      }
    }
  }

  return (
    <FormProvider {...formProps}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Dealing with errors from the server</h1>

        <Input name='firstName' defaultValue='John' />

        <Input name='lastName' defaultValue='Doe' />

        <Button type='submit' />

        <DevTool control={control} />
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
