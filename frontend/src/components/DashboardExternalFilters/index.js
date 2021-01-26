import {
    useRouteMatch,
    Switch,
    Route
  } from "react-router-dom";
  import * as React from 'react'
  import DashboardExternalFiltersComponent from './DashboardExternalFiltersComponent'
  
  const DashboardExternalFilters = (() => {
    let match = useRouteMatch();
    return(
      <Switch>
        <Route path={`${match.url}/`} component={DashboardExternalFiltersComponent} />
      </Switch>
    )
  })
  
  export default DashboardExternalFilters