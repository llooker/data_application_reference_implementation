import React, { useState, useEffect } from 'react'
import { LookerEmbedSDK } from '@looker/embed-sdk'
import { sdk } from "../../helpers/CorsSessionHelper"
import { QueryTable } from '../common/QueryDataTable'

function EmbedApi() {

  const [queryData, setQueryData] = useState([]);

  /**
   * First initialized the embed sdk using the endpoint in /backend/routes/api.js
   * Gets dashboard with ID 13, can be found in the url by going to the dashboard in your looker instance
   */
  const DashboardDiv = () => {
    LookerEmbedSDK.init(process.env.LOOKER_HOST, '/api/auth')

    LookerEmbedSDK.createDashboardWithId(13)
    .appendTo('#lookerdashboard')
    .withNext()
    .build()
    .connect()
    .then(setupDashboard)
    .catch((error) => {
      console.error('An unexpected error occurred', error)
    })
  }
  /**
   * Sets a click event listener on our button to:
   * 1) Call our backend api to set new user permissions
   * 2) reload the dashboard
   * 3) Send a cors request to reload our data table
   * 
   * Also on initial dashboard embed, it finds the iframe and sets it to 50% of the page
   */
  const setupDashboard = (dashboard) => {
    console.log(dashboard)
    document.querySelector('.reload-dashboard').addEventListener('click', async () => {
      await fetch('/api/embed-user/user1/update', { method: 'POST' })
      reloadDashboard(dashboard)
      getQueryData()
    })
    document.querySelector('#lookerdashboard iframe').setAttribute('style', 'width: 100%; height: 100%')
  }

  /**
   * Reload dashboard using dashboard instance
   */
  const reloadDashboard = (dashboard) => {
    dashboard.run()
  }

  /**
   * Using CORS get the query id by querying by slug, you can find a slug in the url of an explore
   * Using the new found id, run the query to get result data
   * Store using a react hook, more info: https://reactjs.org/docs/hooks-state.html
   */
  const getQueryData = async () => {
    const query = await sdk.ok(sdk.query_for_slug('YzS9qg7O0rbnEdT4i7oBJm'))
    const data = await sdk.ok(sdk.run_query({ query_id: query.id, result_format: 'json', limit: 10 }))
    setQueryData(data)
  }

  /**
   * React Hook used to run setup functions after the HTML below has rendered
   * More information here https://reactjs.org/docs/hooks-effect.html
   */
  useEffect(() => {
    DashboardDiv()
    getQueryData()
  }, [])

  return (
    <>
      <button className='reload-dashboard'>Change User Attribute</button>
      <div className='container' style={{ display: 'flex', height: '100%' }}>
        <div className='stuff' style={{width: '49%', height: '100%'}}>
          <div id="lookerdashboard" style={{width: '100%', height: '100%'}}></div>
        </div>
        <div className="query-data" style={{width: '49%', height: '100%'}}>
          {(queryData) !== [] && <QueryTable data={queryData}/>}
        </div>
      </div>
    </>
  )

}

export default EmbedApi