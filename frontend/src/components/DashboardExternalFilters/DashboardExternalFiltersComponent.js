import React, { useState, useEffect } from "react";
import {
  ComponentsProvider,
  Spinner,
  Flex,
  FlexItem,
  Button,
  ButtonOutline,
  Space,
  SpaceVertical,
  MessageBar,
  FieldSelect,
  Popover,
  Box
} from "@looker/components";
import { InputDateRange } from '@looker/components/lib/InputDateRange'
import { DateFormat } from '@looker/components/lib/DateFormat'
import { LookerEmbedSDK } from "@looker/embed-sdk";
import { sdk } from "../../helpers/CorsSessionHelper";
import styled from "styled-components";

const dashboardID = 18,
  pageTitle = "Dashboard with External Filters";

const Dashboard = styled.div`
  width: 100%;
  height: 95vh;
  & > iframe {
    width: 100%;
    height: 100%;
  }
`;

LookerEmbedSDK.init(process.env.LOOKER_HOST, "/api/auth");

// inform, warn,positive, critical
const MessagePane = (props) => {
  const messageText = props.data.text || "placeholder text",
    intent = props.data.intent || "inform";
  return (
    <SpaceVertical gap="xsmall">
      <MessageBar id="dashboard-state" intent={intent}>
        {messageText}
      </MessageBar>
    </SpaceVertical>
  );
};

const FilterElement = (props) => {
  const data = props.data;
  const [options, setOptions] = useState([]);
//   Only used for date selectors
  const [dateChosen, setDateChosen] = useState({
      from: new Date(2020, 11, 1),
      to: new Date(2020, 11, 31)
  });

  const formatDate = (val) => {
      let y = val.getFullYear()
      , m = (val.getMonth() + 1).toString().padStart(2, '0')
      , d = val.getDate().toString().padStart(2, '0')
      return `${y}/${m}/${d}`
  }

  const handleDateChange = (e) => {
    setDateChosen(e)
    let formatted = `${formatDate(e.from)} to ${formatDate(e.to)}`
    props.handleChange(data.name, formatted)
  }

  const parseResultsForOptions = (data) => {
      return data.map(o => { return {value: Object.values(o)[0]} })
  }

  let query_data = {
      result_format: 'json',
      body: {
          model: data.model,
          view: data.explore,
          fields: [data.dimension],
          limit: 500,
        }
  };
  // console.log(query_data)
  // Fetch suggestions
  useEffect(() => {
    if (!(data?.field?.enumerations || data?.field?.is_timeframe)) {
        sdk.ok(sdk.run_inline_query(query_data))
        .then((res) => {
            setOptions(parseResultsForOptions(res));
        })
        .catch((e) => console.error);
    }
  }, [props.data]);

  // IF there are a set of allowed options, then list them
  if (data?.field?.enumerations) {
    return (
      <FieldSelect
        name={data.name}
        label={data.name}
        defaultValue={data.default_value}
        onChange={(e) => props.handleChange(data.name, e)}
        options={data.field.enumerations || null}
      />
    );
  } else if (data?.field?.is_timeframe) {
    return (
        <Popover
            content={
                <Box p="small">
                <InputDateRange
                    defaultValue={dateChosen}
                    onChange={handleDateChange}
                />
                </Box>
            }
            >
            <ButtonOutline>
                <DateFormat>{dateChosen.from}</DateFormat> &mdash;
                <DateFormat>{dateChosen.to}</DateFormat>
            </ButtonOutline>
            </Popover>
    )
  } else {
    return (
      <FieldSelect
        name={data.name}
        label={data.name}
        defaultValue={data.default_value}
        onChange={(e) => props.handleChange(data.name, e)}
        options={options.length > 0 ? options : [{value: "Loading..."}]}
      />
    );
  }
};

// TODO - dynamically fetch the filters, don't hardcode
const FilterPane = (props) => {
  const [filterData, setFilterData] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    sdk
      .ok(sdk.dashboard(dashboardID))
      .then((data) => setFilterData(data.dashboard_filters));
    setLoading(false);
  }, [dashboardID]);

  return (
    <FlexItem m="small" id="filterPane">
      <h4>Filters</h4>
      <Space m="medium">
        {loading && <Spinner />}
        {filterData &&
          filterData.map((f, i) => {
            return (
              <FilterElement
                data={f}
                key={i}
                handleChange={props.handleChange}
              />
            );
          })}
      </Space>
      <Space m="small">
        <Button id="run-dashboard" onClick={props.runDashboard}>
          Run Dashboard
        </Button>
        <Button
          id="stop-dashboard"
          color="critical"
          onClick={props.stopDashboard}
        >
          Stop Dashboard
        </Button>
      </Space>
    </FlexItem>
  );
};

const DashboardPane = (props) => {
  const el = document.querySelector("#dashboardContainer");

  useEffect(() => {
    el && (el.innerHTML = ""); // Reset to nothing
    // Construct with SDK
    LookerEmbedSDK.createDashboardWithId(dashboardID)
      .appendTo("#dashboardContainer")
      .on("dashboard:loaded", () =>
        props.handleMessages({ intent: "inform", text: "Dashboard Loaded" })
      )
      .on("dashboard:run:start", () =>
        props.handleMessages({ intent: "inform", text: "Dashboard Running" })
      )
      .on("dashboard:filters:changed", (e) =>
        console.log(e?.dashboard?.dashboard_filters)
      )
      .on("dashboard:run:complete", () =>
        props.handleMessages({
          intent: "positive",
          text: "Dashboard Run Complete",
        })
      )
      .withNext()
      .withTheme("minimal")
      .build()
      .connect()
      .then(props.setDashboardElement)
      .catch((e) => {
        console.error(e);
        props.handleMessages({ intent: "critical", text: e });
      });
  }, []);
  return (
    <FlexItem m="small" id="dashboardPane">
      <h4>Dashboard</h4>
      {/* <Dashboard ref={DashboardDiv}></Dashboard> */}
      <Dashboard id="dashboardContainer"></Dashboard>
    </FlexItem>
  );
};

const DashboardExternalFiltersComponent = (props) => {
  const [filters, setFilters] = useState({});
  const [messageData, setMessageData] = useState(null);
  const [dashboardElement, setDashboardElement] = useState(null);

  const runDashboard = () => {
    dashboardElement.updateFilters(filters);
    updateMessages({ intent: "inform", text: "Filters Changed" });
    dashboardElement.run();
  };

  const stopDashboard = () => {
    dashboardElement.stop();
  };

  const handleChange = (name, value) => {
    let addition = {};
    addition[name] = value;
    let newFilters = { ...filters, ...addition };
    setFilters(newFilters);
  };

  const updateMessages = (messages) => {
    setMessageData(messages);
  };

  return (
    <ComponentsProvider>
      <Flex flexDirection="column" justifyContent="space-between">
        <h2>{pageTitle}</h2>
        {messageData && <MessagePane data={messageData} />}
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
  );
};

export default DashboardExternalFiltersComponent;
