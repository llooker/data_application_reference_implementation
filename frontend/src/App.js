import React, { useEffect, useState } from 'react'
import EmbedSDK from './components/EmbedSDK'
import EmbedWithApi from './components/EmbedWithApi'
import APIDataContainer from './components/ApiDataBackend'
import ApiQueryFrontend from './components/ApiQueryFrontend'
import CorsExample from './components/CorsExample'
import DashboardExternalFilters from './components/DashboardExternalFilters'
import D3CustomVis from './components/D3CustomVis'
import EmbedTwoInstances from './components/EmbedTwoInstances'
import EmbedExplore from './components/EmbedExplore'
import DashFilters from './components/DashFilters'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import EmbedLookSDK from './components/EmbedLookSDK'

const params = {
  examples: [
    {
      url: '/examples/embed-sdk',
      text: 'Basic Embed with SDK'
    },
    {
      text: 'API Data fetched from backend',
      url: '/examples/api-data-backend'
    },
    {
      text: 'Frontend Data Query',
      url: '/examples/api-query-frontend'
    },
    {
      text: 'Embed With API Example',
      url: '/examples/embed-api'
    },
    {
      text: 'Cors',
      url: '/examples/cors'
    },
    {
      text: 'Embed A Look',
      url: '/examples/embed-look'
    },
    {
      text: 'Embed A Dashboard with External Page Filters',
      url: '/examples/embed-dashboard-external-filters'
    },
    {
      text: 'D3.js Custom Vis',
      url: '/examples/d3-custom-vis'
    },
    {
      text: 'Embed Two',
      url: '/examples/embed-two'
    },
    {
      text: 'Embed Explore',
      url: '/examples/embed-explore'
    },
    {
      text: 'Dashboard w External Filters',
      url: '/examples/dash-filters'
    }
  ]
} 


const SelectExample = () => {
  // const [heading, setHeading] = 
  return(
    <>
      <h1>Select an Example</h1>
      <ul>
      { params.examples.map((example, idx) => {
        return(
          <li key={idx}>
            <Link to={example.url}>{example.text}</Link>
          </li>
        )
      })}
      </ul>
    </>
  )

}

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' component={SelectExample} exact />
        <Route path='/examples/embed-sdk' component={EmbedSDK} />
        <Route path='/examples/api-data-backend' component={APIDataContainer} />
        <Route path='/examples/api-query-frontend' component={ApiQueryFrontend} />
        <Route path='/examples/embed-api' component={EmbedWithApi} />
        <Route path='/examples/cors' component={CorsExample} />
        <Route path='/examples/embed-look' component={EmbedLookSDK} />
        <Route path='/examples/embed-dashboard-external-filters' component={DashboardExternalFilters} />
        <Route path='/examples/d3-custom-vis' component={D3CustomVis} />
        <Route path='/examples/embed-two' component={EmbedTwoInstances} />
        <Route path='/examples/embed-explore' component={EmbedExplore} />
        <Route path='/examples/dash-filters' component={DashFilters} />
      </Switch>
    </Router>
  )
}

export default App