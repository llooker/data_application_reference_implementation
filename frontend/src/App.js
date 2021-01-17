import React, { useEffect, useState } from 'react'
import HomePageWithSidebar from './components/HomePageWithSidebar'
import EmbedSDK from './components/EmbedSDK'
import EmbedWithApi from './components/EmbedWithApi'
import APIDataContainer from './components/ApiDataBackend'
import ApiQueryFrontend from './components/ApiQueryFrontend'
import CorsExample from './components/CorsExample'
import CustomVis from './components/CustomVis'
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
        url: '/examples/google-login',
        user: {
            private: 'asldhfkshjdafl',
            public: 'lakshdsl',
        },
        text: 'Embed with Google Login'
    },
    {
        url: '/examples/homepage-sidebar',
        user: {
            private: 'asldhfkshjdafl',
            public: 'lakshdsl',
        },
        text: 'Homepage with Sidebar'
    },
    {
      url: '/examples/embed-sdk',
      user: {
          private: 'asldhfkshjdafl',
          public: 'lakshdsl',
      },
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
      text: 'Custom Vis',
      url: '/examples/custom-vis'
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
        <Route path='/examples/homepage-sidebar' component={HomePageWithSidebar} />
        <Route path='/examples/embed-sdk' component={EmbedSDK} />
        <Route path='/examples/api-data-backend' component={APIDataContainer} />
        <Route path='/examples/api-query-frontend' component={ApiQueryFrontend} />
        <Route path='/examples/embed-api' component={EmbedWithApi} />
        <Route path='/examples/cors' component={CorsExample} />
        <Route path='/examples/embed-look' component={EmbedLookSDK} />
        <Route path='/examples/custom-vis' component={CustomVis} />
      </Switch>
    </Router>
  )
}

export default App