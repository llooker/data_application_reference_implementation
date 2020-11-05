import React from 'react'
import styled from "styled-components"
import { LookerEmbedSDK } from '@looker/embed-sdk'
import { Looker40SDK, DefaultSettings } from "@looker/sdk";

// create iframe of dashboard
const DashboardDiv = (el) => {
  LookerEmbedSDK.init(process.env.API_HOST, '/api/embed/auth')

  LookerEmbedSDK.createDashboardWithId(13)
  .appendTo(el)
  .build()
  .connect()
  .then(me())
  .catch((error) => {
    console.error('An unexpected error occurred', error)
  })
}

const me = () => {
  fetch('http://localhost:3001/api/auth?id=user1')
  .then(response => response.json())
  .then(data => console.log(data));
}


const EmbedApi = () => {
  return (
    <>
      <Button>Give permissions</Button>
      <div className='stuff' style={{width: '100%', height: '100%'}}>
        <Dashboard ref={DashboardDiv}></Dashboard>
      </div>
    </>
  )
}

const Dashboard = styled.div`
  width: 100%;
  height: 95vh;
  & > iframe {
    width: 100%;
    height: 100%;
  }
` 

export default EmbedApi