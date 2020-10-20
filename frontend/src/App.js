import React, { useEffect, useState } from 'react'
import Example1 from './components/example1'
import EmbedSDK from './components/EmbedSDK'
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
        url: '/examples/google-login-sdk',
        user: {
            private: 'asldhfkshjdafl',
            public: 'lakshdsl',
        },
        text: 'SDK with Google Login'
    },
    {
      url: '/examples/embed-sdk',
      user: {
          private: 'asldhfkshjdafl',
          public: 'lakshdsl',
      },
      text: 'Basic Embed with SDK'
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
        <Route path='/examples/google-login' component={Example1} />
        <Route path='/examples/embed-sdk' component={EmbedSDK} />
      </Switch>
    </Router>
  )
}

export default App