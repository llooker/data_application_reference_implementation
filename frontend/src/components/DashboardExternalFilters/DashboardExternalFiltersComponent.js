import React, { useState, useEffect } from "react";
import { ComponentsProvider, Flex, FlexItem, Button, Space, SpaceVertical, MessageBar, FieldSelect, FieldText} from '@looker/components';
import { LookerEmbedSDK } from "@looker/embed-sdk";
import { sdk } from "../../helpers/CorsSessionHelper";
import styled from "styled-components"

const dashboardID = 1,
  pageTitle = "Dashboard with External Filters";

const Dashboard = styled.div`
  width: 100%;
  height: 95vh;
  & > iframe {
    width: 100%;
    height: 100%;
  }
` 

LookerEmbedSDK.init(process.env.LOOKER_HOST, "/api/auth");

// inform, warn,positive, critical
const MessagePane = (props) => {
    const messageText = props.data.text || 'placeholder text',
    intent = props.data.intent || 'inform'
    return (
        <SpaceVertical gap="xsmall">
        <MessageBar id='dashboard-state' intent={intent}>{messageText}</MessageBar>
        </SpaceVertical>
    )
}

const FilterElement = (props) => {
    const data = props.data;
    // handle things other than field filters (dates / strings / numbers)
    // Use the field selection type to mimic Looker's filters - e.g. use a SelectMulti
    // What if there are loads of filters - CSS?
        // Check the positioning properties - e.g. overflow to see if some are hidden

    // data.type == 'field_filter' // what else can this be?
    if (data?.field?.enumerations) {
        return (
            <FieldSelect
                name={data.name}
                label={data.name}
                defaultValue={data.default_value}
                onChange={e => props.handleChange(data.name, e)}
                options={data.field.enumerations || null}
            />
        )
    } else {
        return (
            <FieldText
                name={data.name}
                label={data.name}
                defaultValue={data.default_value}
                onChange={e => props.handleChange(data.name, e.target.value)}
            />
        )
    }
}

// TODO - dynamically fetch the filters, don't hardcode
const FilterPane = (props) => {
    const [filterData, setFilterData] = useState(undefined);
    
    useEffect(() => {
        sdk.ok(sdk.dashboard(dashboardID)).then(data => setFilterData(data.dashboard_filters))
    }, [dashboardID])

    return (
        <FlexItem m='small' id='filterPane'>
            <h4>Filters</h4>
            <Space m='medium'>
                {filterData && filterData.map((f, i) => {
                    return (<FilterElement
                        data={f}
                        key={i}
                        handleChange={props.handleChange}
                        />)
                })}
            </Space>
            <Space m='small'>
                <Button id='run-dashboard' onClick={props.runDashboard}>Run Dashboard</Button>
                <Button id='stop-dashboard' color='critical' onClick={props.stopDashboard}>Stop Dashboard</Button>
            </Space>
        </FlexItem>
    )
}

const DashboardPane = (props) => {
    const el = document.querySelector('#dashboardContainer');

    useEffect(() => {
        el && (el.innerHTML = '');  // Reset to nothing
        // Construct with SDK
        LookerEmbedSDK.createDashboardWithId(dashboardID)
        .appendTo('#dashboardContainer')
        .on('dashboard:loaded', (d) => {props.handleMessages({ intent: 'inform', text: 'Loaded' })})
        .on('dashboard:run:start', () => props.handleMessages({ intent: 'inform', text: 'Running' }))
        .on('dashboard:filters:changed', (e) => console.log(e?.dashboard?.dashboard_filters))
        .on('dashboard:run:complete', () => props.handleMessages({ intent: 'positive', text: 'Done' }))
        .withNext()
        .withTheme('minimal')
        .build()
        .connect()
        .then(props.setDashboardElement)
        .catch(e => {console.error(e); props.handleMessages({intent:'critical', text: e})})
}, [])
  return (
      <FlexItem m='small' id='dashboardPane'>
          <h4>Dashboard</h4>
          {/* <Dashboard ref={DashboardDiv}></Dashboard> */}
          <Dashboard id='dashboardContainer'></Dashboard>
      </FlexItem>
  )
}

const DashboardExternalFiltersComponent = (props) => {
    const [filters, setFilters] = useState({})
    const [messageData, setMessageData] = useState(null);
    const [dashboardElement, setDashboardElement] = useState(null);
    
    const runDashboard = () => {
        dashboardElement.updateFilters(filters)
        dashboardElement.run()
    }

    const stopDashboard = () => {
        dashboardElement.stop()
    }

    const handleChange = (name, value) => {
        let addition = {}
        addition[name] = value
        let newFilters = { ...filters, ...addition }
        setFilters(newFilters)
    }
    
    const updateMessages = (messages) => {
        setMessageData(messages)
    }

    return (
        <ComponentsProvider>
            <Flex flexDirection='column' justifyContent='space-between'> 
            <h2>{pageTitle}</h2>
            {messageData && <MessagePane data={messageData}/>}
            <FilterPane
                handleChange={handleChange}
                runDashboard={runDashboard}
                stopDashboard={stopDashboard}
                />
            <DashboardPane
                handleMessages={updateMessages}
                filters={filters}
                setDashboardElement={setDashboardElement}
                />
            </Flex>
        </ComponentsProvider>
  )
};

export default DashboardExternalFiltersComponent;
