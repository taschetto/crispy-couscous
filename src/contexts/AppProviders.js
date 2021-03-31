import PropTypes from 'prop-types'

import { CssBaseline } from '@material-ui/core'
import { QueryClientProvider } from 'contexts/QueryClientProvider'
import { ThemeProvider } from 'contexts/ThemeContext'
import { NotificationProvider } from 'contexts/NotificationProvider'

export const AppProviders = ({ children }) => {
  return (
    <QueryClientProvider>
      <ThemeProvider>
        <NotificationProvider>
          <CssBaseline />
          {children}
        </NotificationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

AppProviders.propTypes = {
  children: PropTypes.node,
}
