import {
    useRouteMatch
  } from "react-router-dom";
  import * as React from 'react'
  import APIData from './APIData'
  
  import { ComponentsProvider } from '@looker/components'
  
  const APIDataContainer = (() => {
    let match = useRouteMatch();
    return(
      <ComponentsProvider>
          <APIData />
      </ComponentsProvider>
    )
  })
  
  export default APIDataContainer