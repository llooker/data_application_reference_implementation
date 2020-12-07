import React from 'react'
import styled from "styled-components"
import { LookerEmbedSDK } from '@looker/embed-sdk'

// create iframe of dashboard
const DashboardDiv = (el) => {
  LookerEmbedSDK.init(process.env.LOOKERSDK_EMBED_HOST, '/api/auth')

  LookerEmbedSDK.createDashboardWithId(31)
  .appendTo(el)
  .on('drillmenu:click', (event) => {
    console.log(event)
    let url = "/embed/dashboards-next/32?State=texas"
    return { cancel: true }
  })
  .build()
  .connect()
  .then(addClick)
  .catch((error) => {
    console.error('An unexpected error occurred', error)
  })
}

const addClick = () => {
  window.addEventListener("message", function(event) {
    console.log(event)
    if (event.source === document.getElementById("looker").contentWindow) {
      if (event.origin === "https://sharonpbl.looker.com") {
        // let d = JSON.parse(event.data)
        // e.target.preventDefault()
      }
    }
  });
}

const Embed = () => {
  return (
    <>
      <div className='stuff' style={{width: '100%', height: '100%'}}>
        <Dashboard ref={DashboardDiv} id="looker"></Dashboard>
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