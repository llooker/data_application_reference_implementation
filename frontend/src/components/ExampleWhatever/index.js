import {
  useRouteMatch
} from "react-router-dom";
import * as React from 'react'
import Homepage from './Homepage'

import { ComponentsProvider } from '@looker/components'

const Example1 = (() => {
  let match = useRouteMatch();
  return(
    <ComponentsProvider>
        <Homepage />
    </ComponentsProvider>
  )
})

export default Example1