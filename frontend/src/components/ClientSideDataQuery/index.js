import * as React from 'react'

import { ComponentsProvider } from '@looker/components'

import ClientSideDataQueryComponent from './ClientSideDataQuery'


const ClientSideDataQuery = (() => {
  return(
    <ComponentsProvider>
        <ClientSideDataQueryComponent />
    </ComponentsProvider>
  )
})

export default ClientSideDataQuery