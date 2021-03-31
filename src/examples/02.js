import { useForm } from 'react-hook-form'
import { instance } from 'api'
import { DevTool } from '@hookform/devtools'

export default () => {
  const {
    control,
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting },
  } = useForm()

  const onSubmit = async () => await instance.post('/created')

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Example #02 — Disabling the form while submitting</h1>

      <input
        name='firstname'
        defaultValue='John'
        ref={register}
        disabled={isSubmitting}
      />

      <input
        name='lastName'
        defaultValue='Doe'
        ref={register({ required: true })}
        disabled={isSubmitting}
      />
      {errors.lastName && <span>This field is required</span>}

      <input type='submit' disabled={isSubmitting} />

      <DevTool control={control} />
    </form>
  )
}
