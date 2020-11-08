import { useRouteMatch } from "react-router-dom";
import * as React from 'react'

import { ComponentsProvider } from '@looker/components'

import APIData from './APIData'


const APIDataContainer = (() => {
  let match = useRouteMatch();
  return(
    <ComponentsProvider>
        <APIData />
    </ComponentsProvider>
  )
})

export default APIDataContainer