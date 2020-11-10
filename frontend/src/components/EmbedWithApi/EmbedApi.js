import React from 'react'
import styled from "styled-components"
import { LookerEmbedSDK } from '@looker/embed-sdk'

/**
 * First initialized the embed sdk using the endpoint in /backend/routes/api.js
 * Gets dashboard with ID 13, can be found in the url by going to the dashboard in your looker instance
 * @param {Object} el The Dom object from Dashboard component 
 */
const DashboardDiv = (el) => {
  LookerEmbedSDK.init(process.env.API_HOST, '/api/auth')

  LookerEmbedSDK.createDashboardWithId(13)
  .appendTo(el)
  .build()
  .connect()
  .catch((error) => {
    console.error('An unexpected error occurred', error)
  })
}

/**
 * Calls our internal API at /backend/routes/api.js to update the embed users permissions
 * Reloads the dashboard
 */
const updateAttributes = async () => {
  await fetch('/api/embed-user/user1/update', { method: 'POST' })
  reloadDashboard()
}

/**
 * Users the built in messaging of the dashboard embed to tell it to reload
 */
const reloadDashboard = () => {
  const my_iframe = document.querySelector("#lookerdashboard iframe");
  const my_request = JSON.stringify({ type: "dashboard:run" })
  my_iframe.contentWindow.postMessage(my_request, 'https://dat.dev.looker.com')
}

const EmbedApi = () => {
  return (
    <>
      <button onClick={() => updateAttributes()}>Change User Attribute</button>
      <div className='stuff' style={{width: '100%', height: '100%'}}>
        <Dashboard ref={DashboardDiv} id="lookerdashboard"></Dashboard>
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