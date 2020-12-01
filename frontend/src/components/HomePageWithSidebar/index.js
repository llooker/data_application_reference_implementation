import {
  useRouteMatch
} from "react-router-dom";
import * as React from 'react'
import Homepage from './Homepage'

import { ComponentsProvider } from '@looker/components'

const HomePageWithSidebar = (() => {
  let match = useRouteMatch();
  return(
    <ComponentsProvider>
        <Homepage />
    </ComponentsProvider>
  )
})

export default HomePageWithSidebar