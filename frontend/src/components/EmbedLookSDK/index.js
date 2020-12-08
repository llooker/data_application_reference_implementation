import {
  useRouteMatch,
  Switch,
  Route
} from "react-router-dom";
import * as React from 'react'
import Embed from './Embed'

const EmbedLookSDK = (() => {
  let match = useRouteMatch();
  return(
    <Switch>
      <Route path={`${match.url}/`} component={Embed} />
    </Switch>
  )
})

export default EmbedLookSDK