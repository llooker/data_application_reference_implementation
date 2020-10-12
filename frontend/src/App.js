import * as React from 'react'

import { ComponentsProvider } from '@looker/components'

import Homepage from './components/Homepage'


function App() {
  return (
    <>
      <ComponentsProvider>
        <Homepage />
      </ComponentsProvider>
    </>
  )
}

export default App