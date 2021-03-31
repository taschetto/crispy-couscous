import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { instance } from 'api'

export default () => {
  const { register, handleSubmit, errors, control } = useForm()

  const onSubmit = async () => await instance.post('/created')

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Submitting the form</h1>

      <input name='firstName' defaultValue='John' ref={register} />

      <input
        name='lastName'
        defaultValue='Doe'
        ref={register({ required: true })}
      />
      {errors.lastName && <span>This field is required</span>}

      <input type='submit' />

      <DevTool control={control} />
    </form>
  )
}
