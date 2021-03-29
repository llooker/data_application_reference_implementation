import React, { useCallback } from 'react'
import styled from "styled-components"
import { LookerEmbedSDK } from '@looker/embed-sdk'

/**
   * First initialized the embed sdk using the endpoint in /backend/routes/api.js
   * Gets look with ID, can be found in the url by viewing the look via your looker instance   */


const Embed = () => {
  const LookDiv = useCallback((el) => {
    if (el) {
      el.innerHTML = ''
    LookerEmbedSDK.init(
      process.env.LOOKERSDK_EMBED_HOST, 
      { url: '/api/auth' ,headers: [{ name: 'usertoken', value: 'user1' } ]}
      )
  
    LookerEmbedSDK.createExploreWithId('reference_implementation::order_items')
    .appendTo(el)
    .build()
    .connect()
    .catch((error) => {
      console.error('An unexpected error occurred', error)
    })
  }},[])
  return (
    <>
      <div className='stuff' style={{width: '100%', height: '100%'}}>
        <Look ref={LookDiv}></Look>
      </div>
    </>
  )
}

const Look = styled.div`
  width: 100%;
  height: 95vh;
  & > iframe {
    width: 100%;
    height: 100%;
  }
` 

export default Embed