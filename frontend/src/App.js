import * as React from 'react'

import Example1 from './components/example1'
import SelectExample from './components/SelectExample'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/examples/google-login'>
          <Example1 />
        </Route>
        <Route path='/'>
          <SelectExample />
        </Route>
      </Switch>
    </Router>
  )
}

export default App