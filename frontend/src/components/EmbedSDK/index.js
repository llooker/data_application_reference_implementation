import {
  useRouteMatch,
  Switch,
  Route
} from "react-router-dom";
import * as React from 'react'
import Homepage from './Embed'

import { ComponentsProvider } from '@looker/components'

const EmbedSDK = (() => {
  let match = useRouteMatch();
  return(
    <Switch>
      <Route path={`${match.url}/`} component={Homepage} />
    </Switch>
  )
})

export default EmbedSDK