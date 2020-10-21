import React, { useEffect, useState } from 'react'
import HomePageWithSidebar from './components/HomePageWithSidebar'
import EmbedSDK from './components/EmbedSDK'
import APIDataContainer from './components/ApiDataBackend'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import styled from "styled-components"

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
      </Switch>
    </Router>
  )
}

export default App