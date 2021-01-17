import * as React from 'react'

import { ComponentsProvider } from '@looker/components'

import CustomVisComponent from './CustomVisComponent'


const ApiQueryFrontend = (() => {
  return(
    <ComponentsProvider>
        <CustomVisComponent />
    </ComponentsProvider>
  )
})

export default CustomVis