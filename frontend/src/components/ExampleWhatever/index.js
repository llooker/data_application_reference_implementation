import {
  useRouteMatch
} from "react-router-dom";
import * as React from 'react'

import { ComponentsProvider } from '@looker/components'

import Homepage from './Homepage'


const Example1 = (() => {
  let match = useRouteMatch();
  return(
    <ComponentsProvider>
        <Homepage />
    </ComponentsProvider>
  )
})

export default Example1