import './App.css'

import { Redirect, Route, Router, Switch } from 'react-router-dom'
import { history } from 'utils/history'

import { Example01 } from './examples/01'

export const App = () => (
  <Router history={history}>
    <Switch>
      <Route exact path='/'>
        <Redirect to='/example01' />
      </Route>
      <Route path='/example01' component={Example01} />
    </Switch>
  </Router>
)
