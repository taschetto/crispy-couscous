import {
  useForm,
  FormProvider,
  useFormContext,
  Controller,
} from 'react-hook-form'
import { useCallback } from 'react'
import { instance } from 'api'
import { DevTool } from '@hookform/devtools'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Grid, TextField, Button as MuiButton } from '@material-ui/core'
import { path } from 'ramda'
import { useMutation } from 'react-query'

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
})

const useCustomMutation = (options = {}) =>
  useMutation(async () => await instance.post('/unprocessable-entity'), {
    ...options,
  })

export default () => {
  const formProps = useForm({ resolver: yupResolver(schema) })
  const { control, handleSubmit, setError } = formProps

  const { mutateAsync } = useCustomMutation({
    onError: ({
      response: {
        data: { errors },
      },
    }) => {
      const firstNameError = errors.find(({ name }) => name === 'firstName')
      if (firstNameError) {
        setError('firstName', { message: firstNameError.message })
      }

      const lastNameError = errors.find(({ name }) => name === 'lastName')
      if (lastNameError) {
        setError('lastName', { message: lastNameError.message })
      }
    },
  })

  const customHandleSubmit = useCallback(
    onSubmit => handleSubmit(data => onSubmit(data).catch(() => {})),
    [handleSubmit]
  )

  return (
    <FormProvider {...formProps}>
      <form onSubmit={customHandleSubmit(mutateAsync)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h1>Using `mutateAsync` and dealing with the uncaught exception</h1>
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
    control,
  } = useFormContext()

  const disabled = isSubmitting
  const helperText = path([name, 'message'], errors)
  const error = Boolean(helperText)

  return (
    <Controller
      as={
        <TextField
          name={name}
          label={label}
          ref={register}
          disabled={disabled}
          helperText={helperText}
          error={error}
          variant='filled'
          fullWidth
        />
      }
      name={name}
      control={control}
      defaultValue={defaultValue}
    />
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
