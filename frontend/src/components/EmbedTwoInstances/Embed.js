import React from 'react'
import styled from "styled-components"
import { LookerEmbedSDK } from '@looker/embed-sdk'

// create iframe of dashboard
const DashboardDiv = (el) => {
  LookerEmbedSDK.init(process.env.LOOKERSDK_EMBED_HOST, '/api/auth')

  LookerEmbedSDK.createDashboardWithId(1)
  .appendTo(el)
  .withNext()
  .build()
  .connect()
  .then(() => DashboardDiv2())
  .catch((error) => {
    console.error('An unexpected error occurred', error)
  })
}

const DashboardDiv2 = () => {
  fetch(`http://localhost:4000/api/auth?src=${encodeURI('/embed/dashboards-next/1?embed_domain=http://localhost:3001&sdk=2')}`)
  .then(response => response.json())
  .then(data => DashboardDiv3(data.url))
}

const DashboardDiv3 = (url) => {
  LookerEmbedSDK.createDashboardWithUrl(url)
  .appendTo('#dashboard2')
  .withNext()
  .build()
  .connect()
  .catch((error) => {
    console.error('An unexpected error occurred', error)
  })
}

const Embed = () => {
  return (
    <>
      <div className='stuff' style={{width: '100%', height: '100%'}}>
        <Dashboard ref={DashboardDiv}></Dashboard>
        <Dashboard id="dashboard2"></Dashboard>
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

export default Embed