import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import { instance } from 'api'
import { DevTool } from '@hookform/devtools'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Grid, TextField, Button as MuiButton } from '@material-ui/core'
import { path } from 'ramda'

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
})

export const Example06 = () => {
  const formProps = useForm({ resolver: yupResolver(schema) })
  const { control, handleSubmit, setError } = formProps

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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h1>
              Example #06 — Making it look nice with @material-ui (but is
              doesn&apos;t work)
            </h1>
          </Grid>
          <Grid item xs={4}>
            <Input name='firstName' defaultValue='John' label='First name' />
          </Grid>
          <Grid item xs={4}>
            <Input name='lastName' defaultValue='Doe' label='Last name' />
          </Grid>
          <Grid item xs={4}>
            <Button type='submit' />
          </Grid>
        </Grid>
        <DevTool control={control} />
      </form>
    </FormProvider>
  )
}

const Input = ({ name, label, defaultValue = '' }) => {
  const {
    register,
    formState: { isSubmitting },
    errors,
  } = useFormContext()

  const disabled = isSubmitting
  const helperText = path([name, 'message'], errors)
  const error = Boolean(helperText)

  return (
    <>
      <TextField
        name={name}
        label={label}
        defaultValue={defaultValue}
        ref={register}
        disabled={disabled}
        helperText={helperText}
        error={error}
        variant='filled'
        fullWidth
      />
    </>
  )
}

const Button = ({
  children = 'Submit',
  variant = 'outlined',
  fullWidth = true,
  ...props
}) => {
  const {
    formState: { isSubmitting },
  } = useFormContext()

  return (
    <MuiButton
      {...props}
      disabled={isSubmitting}
      variant={variant}
      fullWidth={fullWidth}>
      {children}
    </MuiButton>
  )
}
