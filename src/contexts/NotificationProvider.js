import { SnackbarProvider } from 'notistack'

export const NotificationProvider = ({ children }) => {
  return (
    <SnackbarProvider
      autoHideDuration={NOTIFICATION_TIMEOUT_MS}
      maxSnack={NOTIFICATION_MAX_VISIBLE}
      anchorOrigin={{
        vertical: NOTIFICATION_POSITION_VERTICAL,
        horizontal: NOTIFICATION_POSITION_HORIZONTAL,
      }}>
      {children}
    </SnackbarProvider>
  )
}

const NOTIFICATION_TIMEOUT_MS = 4 * 1000 // 4 seconds

/**
 * How many notifications will be visible at the same time.
 * @constant
 * @type {number}
 */
const NOTIFICATION_MAX_VISIBLE = 3

/**
 * Notifications vertical anchor origin.
 * @constant
 * @type {string}
 */
const NOTIFICATION_POSITION_VERTICAL = 'top'

/**
 * Notifications horizontal anchor origin.
 * @constant
 * @type {string}
 */
const NOTIFICATION_POSITION_HORIZONTAL = 'center'
