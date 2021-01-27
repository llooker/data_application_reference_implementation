import * as React from 'react'

import { ComponentsProvider } from '@looker/components'

import D3CustomVisComponent from './D3CustomVis'


const D3CustomVis = (() => {
  return(
    <ComponentsProvider>
        <D3CustomVisComponent />
    </ComponentsProvider>
  )
})

export default D3CustomVis