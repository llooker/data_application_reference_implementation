import * as React from 'react'

import { ComponentsProvider } from '@looker/components'

import ApiQueryFrontendComponent from './ApiQueryFrontend'


const ApiQueryFrontend = (() => {
  console.log('ApiQueryFrontend()')
  return(
    <ComponentsProvider>
        <ApiQueryFrontendComponent />
    </ComponentsProvider>
  )
})

export default ApiQueryFrontend