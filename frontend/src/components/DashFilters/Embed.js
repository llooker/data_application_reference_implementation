import React, { useCallback, useState }  from 'react'
import styled from "styled-components"
import { LookerEmbedSDK } from '@looker/embed-sdk'
import { Box,CheckboxGroup } from '@looker/components'

const Embed = () => {
  const [filterState, setFilterState] = useState({});
  const [dashboard, setDashboard] = useState(dashboard);
  const setupDashboard = (dash) => {
    setDashboard(dash)
    console.log(dashboard)
  }

  const updateDashboardFilters = (filters) => {
    if (dashboard) { 
      dashboard.updateFilters({ "Status": filters.filter((el) => el != '').join(',')})
      dashboard.run()
    } 
  }

  const mangageFilterState = (event) => {
    console.log(event.dashboard.dashboard_filters)
  }


  const makeDashboard = useCallback((el) => {
    if (el) {
      el.innerHTML = ''
    LookerEmbedSDK.init(
      process.env.LOOKERSDK_EMBED_HOST, 
      { 
        url: '/api/auth' 
       ,headers: [
           { name: 'usertoken', value: 'user1' } 
        ]
      }
      )
    LookerEmbedSDK.createDashboardWithId(20)
    .appendTo(el)
    .withNext()
    .on('dashboard:loaded',mangageFilterState)
    .build()
    .connect()
    .then(setupDashboard)
    .catch((error) => {
      console.error('An unexpected error occurred', error)
    })
  }
}, [])

const Status = [
  {
    label: 'Cancelled',
    value: 'Cancelled',
  },
  {
    label: 'Complete',
    value: 'Complete',
  },
  {
    label: 'Processing',
    value: 'Processing',
  },
  {
    label: 'Returned',
    value: 'Returned',
  },
  {
    label: 'Shipped',
    value: 'Shipped',
  },
]


  return (
    <>
          <Box height="100" > 
          <CheckboxGroup pl="10"
            defaultValue={['']}
            inline
            name="group1"
            options={Status}
            onChange={(e)=>{updateDashboardFilters(e)}}
              />
          </Box>
          <Dashboard ref={makeDashboard} />
          
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