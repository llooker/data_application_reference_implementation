import React from 'react'
import { sdk } from "../../helpers/CorsSessionHelper"



const CorsExampleComp = () => {
  const me = sdk.ok(sdk.me())
  return (
    <>
      <div className='stuff' style={{width: '100%', height: '100%'}}>
        { me.display_name }
      </div>
    </>
  )
}


export default CorsExampleComp