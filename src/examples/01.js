import { useForm } from 'react-hook-form'

import { instance } from 'api'

export const Example01 = () => {
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = async () => await instance.post('/example01')

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name='example' defaultValue='test' ref={register} />
      <input name='exampleRequired' ref={register({ required: true })} />
      {errors.exampleRequired && <span>This field is required</span>}
      <input type='submit' />
    </form>
  )
}
