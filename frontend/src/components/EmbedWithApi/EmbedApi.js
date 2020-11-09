import React, { useState } from 'react'
import styled from "styled-components"
import { LookerEmbedSDK } from '@looker/embed-sdk'
import { sdk } from "../../helpers/CorsSessionHelper"

// create iframe of dashboard
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

const updateAttributes = async () => {
  const me = await sdk.ok(sdk.me())
  console.log(me)
  const attrs = {
    value: "Jeans",
  }
  await sdk.ok(sdk.set_user_attribute_user_value(me.id, 23, attrs))
  reloadDashboard()
}

const reloadDashboard = () => {
  const my_iframe = document.querySelector("#lookerdashboard iframe");
  const my_request = JSON.stringify({ type: "dashboard:run" })
  my_iframe.contentWindow.postMessage(my_request, 'https://dat.dev.looker.com')
}

const EmbedApi = () => {
  return (
    <>
      <button onClick={() => updateAttributes()}>Give permissions</button>
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