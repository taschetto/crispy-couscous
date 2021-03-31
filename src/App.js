import './App.css'

import { Route, Router, Switch } from 'react-router-dom'
import { history } from 'utils/history'

export const App = () => (
  <Router history={history}>
    <Switch>
      <Route path='/page1' component={() => <h1>Page 1</h1>} />
      <Route path='/page2' component={() => <h1>Page 2</h1>} />
      <Route path='/page3' component={() => <h1>Page 3</h1>} />
      <Route path='/page4' component={() => <h1>Page 4</h1>} />
      <Route path='/page5' component={() => <h1>Page 5</h1>} />
    </Switch>
  </Router>
)
