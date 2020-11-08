import {
  useRouteMatch,
  Switch,
  Route
} from "react-router-dom";
import * as React from 'react'

import EmbedApi from './EmbedApi'


const EmbedWithApi = (() => {
  let match = useRouteMatch();
  return(
    <Switch>
      <Route path={`${match.url}/`} component={EmbedApi} />
    </Switch>
  )
})

export default EmbedWithApi