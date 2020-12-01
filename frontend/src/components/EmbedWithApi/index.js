import {
  useRouteMatch,
  Switch,
  Route
} from "react-router-dom";
import * as React from 'react'
import EmbedApi from './EmbedApi'
import { ComponentsProvider } from '@looker/components'

const EmbedWithApi = (() => {
  let match = useRouteMatch();
  return(
    <ComponentsProvider>
      <Switch>
        <Route path={`${match.url}/`} component={EmbedApi} />
      </Switch>
    </ComponentsProvider>
  )
})

export default EmbedWithApi