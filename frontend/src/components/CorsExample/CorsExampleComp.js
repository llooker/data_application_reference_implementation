import React, {useEffect, useState} from 'react'
import { sdk } from "../../helpers/CorsSessionHelper"

const CorsExampleComp = () => {
  const [user, setUser] = useState('');
  useEffect(() => {
    const apiCall = async () => {
        const response = await sdk.ok(sdk.me())
        setUser(response.display_name)
    }
    apiCall()
  },[]);


  return (
    <>
      <div style={{width: '100%', height: '100%'}}>
        {user}
      </div>
    </>
  )
}


export default CorsExampleComp