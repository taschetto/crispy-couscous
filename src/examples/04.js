import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import { instance } from 'api'
import { DevTool } from '@hookform/devtools'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
})

export const Example04 = () => {
  const formProps = useForm({ resolver: yupResolver(schema) })
  const { control, handleSubmit } = formProps

  const onSubmit = async () => await instance.post('/created')

  return (
    <FormProvider {...formProps}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Example #04 — Create smart form components</h1>

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
