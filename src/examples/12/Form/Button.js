import { useFormContext } from 'react-hook-form'
import { Button as MuiButton } from '@material-ui/core'

export const Button = ({
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
