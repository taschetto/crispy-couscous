import { yupResolver } from '@hookform/resolvers/yup'
import { Grid, Collapse } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { useCustomMutation } from './useCustomMutation'
import { schema } from './schema'
import { FormProvider, useForm, Input, Button, setAsyncError } from './Form'
import { useSnackbar } from 'notistack'

export default () => {
  const { enqueueSnackbar } = useSnackbar()

  const { formWideError, setFormWideError, ...formProps } = useForm({
    resolver: yupResolver(schema),
  })

  const { handleSubmit, setError } = formProps

  const options = {
    onSuccess: () => {
      enqueueSnackbar('Created successfully.', {
        variant: 'success',
      })
    },
    onMutate: () => setFormWideError(''),
    onError: error => {
      enqueueSnackbar('Something went wrong.', {
        variant: 'error',
      })
      setAsyncError(setError, setFormWideError)(error)
    },
  }

  const { mutateAsync: created } = useCustomMutation('/created', options)

  const { mutateAsync: unprocessableEntity } = useCustomMutation(
    '/unprocessable-entity',
    options
  )

  const { mutateAsync: conflict } = useCustomMutation('/conflict', options)

  return (
    <FormProvider {...formProps}>
      <form onSubmit={handleSubmit(created)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h1>Final version</h1>
          </Grid>
          <Grid item xs={12}>
            <Collapse in={Boolean(formWideError)}>
              <Alert severity='error' onClose={() => setFormWideError('')}>
                <AlertTitle>An error occurred</AlertTitle>
                {formWideError}
              </Alert>
            </Collapse>
          </Grid>
          <Grid item xs={4}>
            <Input name='firstName' defaultValue='John' label='First name' />
          </Grid>
          <Grid item xs={4}>
            <Input name='lastName' defaultValue='Doe' label='Last name' />
          </Grid>
          <Grid item xs={4}>
            <Button onClick={handleSubmit(created)}>Submit (201)</Button>
            <Button onClick={handleSubmit(conflict)}>Submit (409)</Button>
            <Button onClick={handleSubmit(unprocessableEntity)}>
              Submit (422)
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  )
}
