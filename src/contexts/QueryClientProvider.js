import PropTypes from 'prop-types'
import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) =>
        ![401, 404].includes(error?.response?.status) && failureCount < 2,
    },
  },
})

export const QueryClientProvider = ({ children, enableDevTools = true }) => (
  <ReactQueryClientProvider client={queryClient}>
    {children}
    {enableDevTools && <ReactQueryDevtools initialIsOpen={false} />}
  </ReactQueryClientProvider>
)

QueryClientProvider.propTypes = {
  children: PropTypes.node.isRequired,
  enableDevTools: PropTypes.bool,
}
