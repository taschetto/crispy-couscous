import './App.css'

import { Button, AppBar, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  Redirect,
  Route,
  Router,
  Switch,
  useParams,
  Link,
} from 'react-router-dom'
import { history } from 'utils/history'

import Example01 from './examples/01'
import Example02 from './examples/02'
import Example03 from './examples/03'
import Example04 from './examples/04'
import Example05 from './examples/05'
import Example06 from './examples/06'
import Example07 from './examples/07'

const examples = [
  { key: 1, Component: Example01 },
  { key: 2, Component: Example02 },
  { key: 3, Component: Example03 },
  { key: 4, Component: Example04 },
  { key: 5, Component: Example05 },
  { key: 6, Component: Example06 },
  { key: 7, Component: Example07 },
]

const fallbackUi = () => <h1>Example not found</h1>

export const App = () => {
  const classes = useStyles()
  return (
    <Router history={history}>
      <div className={classes.container}>
        <div className={classes.examples}>
          <Switch>
            <Route exact path='/'>
              <Redirect to='/examples/01' />
            </Route>
            <Route
              exact
              path='/examples/:exampleId'
              component={RenderExample}
            />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

const Menu = () => {
  const classes = useStyles()
  const { exampleId } = useParams()

  const id = Number(exampleId)
  const first = Number(id) === 1
  const last = Number(id) >= examples.length

  return (
    <AppBar position='fixed' color='primary' className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        {!first && (
          <Button
            variant='outlined'
            component={Link}
            to={`/examples/${id - 1}`}>
            Previous
          </Button>
        )}
        <Typography variant='h4'>Example #{id}</Typography>
        {!last && (
          <Button
            variant='outlined'
            component={Link}
            to={`/examples/${id + 1}`}>
            Next
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

const RenderExample = () => {
  const { exampleId } = useParams()
  const example = examples.find(({ key }) => Number(key) === Number(exampleId))
  const Component = example?.Component ?? fallbackUi
  return (
    <>
      <Menu />
      <Component />
    </>
  )
}

const useStyles = makeStyles(() => ({
  container: {
    width: '100v',
    height: '100vh',
    display: 'flex',
  },
  examples: {
    margin: 'auto',
    maxWidth: '800px',
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  toolbar: {
    justifyContent: 'center',
    '& > *': {
      marginLeft: 8,
      marginRight: 8,
    },
  },
}))
