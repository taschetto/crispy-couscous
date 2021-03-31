import { useForm } from 'react-hook-form'
import { instance } from 'api'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
})

export const Example03 = () => {
  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting },
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = async () => await instance.post('/created')

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Example #03 — Schema Validation with `yup`</h1>

      <input
        name='firstName'
        defaultValue='John'
        ref={register}
        disabled={isSubmitting}
      />

      <input
        name='lastName'
        defaultValue='Doe'
        ref={register()}
        disabled={isSubmitting}
      />
      {errors.lastName && <span>{errors.lastName.message}</span>}

      <input type='submit' disabled={isSubmitting} />

      <pre>{JSON.stringify(errors, null, 2)}</pre>
    </form>
  )
}
