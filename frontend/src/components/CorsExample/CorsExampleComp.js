import React from 'react'
import { CorsSessionHelper } from '../helpers/CorsSessionHelper'
import { Looker40SDK, DefaultSettings } from "@looker/sdk";


// creates SDK variable to will allow you to call sdk functions with CORS
const SDK = () => {

  let user = {}
  fetch('http://localhost:3001/api/auth?id=user1')
  .then(response => response.json())
  .then(data => user = data.user);

  console.log(user)
  const session = new CorsSessionHelper({
    ...DefaultSettings(),
    base_url: `https://dat.dev.looker.com:19999`,
    accessToken: user.accessToken
  })

  let sdk = new Looker40SDK(session);
  return sdk;
}

const CorsExampleComp = () => {
  SDK()
  return (
    <>
      <div className='stuff' style={{width: '100%', height: '100%'}}>
      </div>
    </>
  )
}


export default CorsExampleComp