import PropTypes from 'prop-types'

import { CssBaseline } from '@material-ui/core'
import { QueryClientProvider } from 'contexts/QueryClientProvider'
import { ThemeProvider } from 'contexts/ThemeContext'

export const AppProviders = ({ children }) => {
  return (
    <QueryClientProvider>
      <ThemeProvider>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}

AppProviders.propTypes = {
  children: PropTypes.node,
}
