import React, { useCallback }  from 'react'
import styled from "styled-components"
import { LookerEmbedSDK } from '@looker/embed-sdk'

const Embed = () => {
  const makeDashboard = useCallback((el) => {
    if (el) {
      el.innerHTML = ''
    /* 
      Step 1) call init() pointing the SDK to a looker host, a service to get the iframe URLs from, and passing user identifying information in the header
      no call to the auth service is made at this step
    */
    LookerEmbedSDK.init(
      process.env.LOOKERSDK_EMBED_HOST, 
      { 
        //The location of the service which will privately create a signed URL
        url: '/api/auth' 
       ,headers: [
           //include some factor which your auth service can use to uniquely identify a user, so that a user specific url can be returned. This could be a token or ID
           { name: 'usertoken', value: 'user1' } 
        ]
      }
      )
    /*
      Step 2 Create your dashboard (or other peice of embedded content) through a simple set of chained methods
    */
    LookerEmbedSDK.createDashboardWithId(20)
    //adds the iframe to the DOM as a child of a specific element
    .appendTo(el)
    //this instructs the SDK to point to the /dashboards-next/ version 
    .withNext()
    //the .on() method allows us to listen for and respond to events inside the iframe. See here for a list of events: https://docs.looker.com/reference/embedding/embed-javascript-events
    .on('dashboard:loaded',(e)=>{alert('Successfully Loaded!')})
    //this line performs the call to the auth service to get the iframe's src='' url, places it in the iframe and the client performs the request to Looker
    .build()
    // this establishes event communication between the iframe and parent page
    .connect()
    //catch various errors which can occur in the process (note: does not catch 404 on content)
    .catch((error) => {
      console.error('An unexpected error occurred', error)
    })
  }
}, [])


  return (
    <>
        {/* Step 0) we have a simple container, which performs a callback to our makeDashboard function */}
          <Dashboard ref={makeDashboard}></Dashboard>
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