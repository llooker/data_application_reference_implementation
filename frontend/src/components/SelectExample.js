import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import { Link } from "react-router-dom"

const params = {
  examples: [
    {    
        url: 'examples/google-login',
        user: {
            private: 'asldhfkshjdafl',
            public: 'lakshdsl',
        },
        text: 'Embed with Google Login'
    },
    {
        url: 'examples/google-login-sdk',
        user: {
            private: 'asldhfkshjdafl',
            public: 'lakshdsl',
        },
        text: 'SDK with Google Login'
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

export default SelectExample