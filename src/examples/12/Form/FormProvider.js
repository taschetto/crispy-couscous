import {
  FormProvider as ReactHookFormProvider,
  useFormContext,
} from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

export const FormProvider = ({ children, ...other }) => (
  <ReactHookFormProvider {...other}>
    {children}
    <DevTools />
  </ReactHookFormProvider>
)

const DevTools = () => {
  const { control } = useFormContext()
  return <DevTool control={control} />
}
