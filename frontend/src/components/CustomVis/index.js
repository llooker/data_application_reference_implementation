import * as React from 'react'

import { ComponentsProvider } from '@looker/components'

import CustomVisComponent from './CustomVis'


const CustomVis = (() => {
  return(
    <ComponentsProvider>
        <CustomVisComponent />
    </ComponentsProvider>
  )
})

export default CustomVis