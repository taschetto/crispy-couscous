import {
  useReducer,
  useMemo,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from 'react'

import PropTypes from 'prop-types'

import { blueGrey, indigo } from '@material-ui/core/colors'

import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles'

const themeReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        paletteType: action.payload.paletteType ?? state.paletteType,
      }
    default:
      throw new Error(`Unrecognized type ${action.type}`)
  }
}

export const ThemeProvider = ({ children }) => {
  const [themeOptions, dispatch] = useReducer(themeReducer, {
    paletteType: 'light',
  })

  const { paletteType } = themeOptions

  const theme = useMemo(() => {
    return createMuiTheme({
      palette: {
        type: paletteType,
        primary: {
          main: blueGrey[400],
        },
        secondary: {
          main: indigo[400],
        },
      },
      typography: {
        fontFamily: ['"Nunito"', '"Helvetica"', '"Arial"', 'sans-serif'].join(
          ','
        ),
      },
      shape: {
        borderRadius: 4,
        double: {
          borderRadius: 8,
        },
      },
    })
  }, [paletteType])

  useEffect(() => {
    // Expose the theme as a global variable so people can play with it.
    if (process.browser) {
      window.theme = theme
    }
  }, [theme])

  return (
    <MuiThemeProvider theme={theme}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </MuiThemeProvider>
  )
}

export const DispatchContext = createContext(() => {
  throw new Error('Forgot to wrap component in ThemeContext.Provider')
})

export function useChangeTheme() {
  const dispatch = useContext(DispatchContext)

  return useCallback(
    options => dispatch({ type: 'CHANGE', payload: options }),
    [dispatch]
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
