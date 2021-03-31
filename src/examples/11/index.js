import { yupResolver } from '@hookform/resolvers/yup'
import { Grid } from '@material-ui/core'
import { useCustomMutation } from './useCustomMutation'
import { schema } from './schema'
import { FormProvider, useForm, Input, Button, setAsyncError } from './Form'

export default () => {
  const formProps = useForm({ resolver: yupResolver(schema) })
  const { handleSubmit, setError } = formProps
  const { mutateAsync } = useCustomMutation({
    onError: setAsyncError(setError),
  })

  return (
    <FormProvider {...formProps}>
      <form onSubmit={handleSubmit(mutateAsync)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h1>Organizing components</h1>
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
      </form>
    </FormProvider>
  )
}
