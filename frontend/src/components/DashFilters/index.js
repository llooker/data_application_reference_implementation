import {
  useRouteMatch,
  Switch,
  Route
} from "react-router-dom";
import * as React from 'react'
import Embed from './Embed'

import { ComponentsProvider } from '@looker/components'

const DashFilters = (() => {
  let match = useRouteMatch();
  return(
    <Switch>
      <ComponentsProvider>
      <Route path={`${match.url}/`} component={Embed} />
      </ComponentsProvider>
    </Switch>
  )
})

export default DashFilters