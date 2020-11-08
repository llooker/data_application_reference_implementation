import React from 'react'
import styled from "styled-components"

import { LookerEmbedSDK } from '@looker/embed-sdk'

import config from '../../config.js'


// create iframe of dashboard
const DashboardDiv = (el) => {
  LookerEmbedSDK.init(config.LOOKER_EMBED_HOST, '/api/auth')

  LookerEmbedSDK.createDashboardWithId(config.EmbedSDK_dashboard)
  .appendTo(el)
  .build()
  .connect()
  .then(me())
  .catch((error) => {
    console.error('An unexpected error occurred', error)
  })
}

const me = () => {
  fetch(config.PBL_HOST + '/api/auth?id=' + config.authenticatedUser.external_user_id)
  .then(response => response.json())
  .then(data => console.log(data));
}


const EmbedApi = () => {
  return (
    <>
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