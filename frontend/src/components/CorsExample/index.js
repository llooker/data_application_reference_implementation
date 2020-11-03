import {
  useRouteMatch,
  Switch,
  Route
} from "react-router-dom";
import * as React from 'react'
import CorsExampleComp from './CorsExampleComp'

const EmbedWithApi = (() => {
  let match = useRouteMatch();
  return(
    <Switch>
      <Route path={`${match.url}/`} component={CorsExampleComp} />
    </Switch>
  )
})

export default CorsExample