import {
  useRouteMatch,
  Switch,
  Route
} from "react-router-dom";
import * as React from 'react'
import Embed from './Embed'

import { ComponentsProvider } from '@looker/components'

const EmbedSDK = (() => {
  let match = useRouteMatch();
  return(
    <Switch>
      <Route path={`${match.url}/`} component={Embed} />
    </Switch>
  )
})

export default EmbedSDK