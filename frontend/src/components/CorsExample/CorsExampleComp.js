import React from 'react'
import { Looker40SDK, DefaultSettings } from "@looker/sdk";
import { sdk } from "../../helpers/CorsSessionHelper"



const CorsExampleComp = () => {
  const me = sdk.ok(sdk.me())
  return (
    <>
      <div className='stuff' style={{width: '100%', height: '100%'}}>
      </div>
    </>
  )
}


export default CorsExampleComp