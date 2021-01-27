import React, { useEffect, useState } from "react";

import {
  Space,
  Status,
  Spinner
} from "@looker/components";

import { sdk } from "../../helpers/CorsSessionHelper"


/**
 * Runs a simple query on load (to populate an HTML table)
 * - Uses the Query API: https://docs.looker.com/reference/api-and-integration/api-reference/v4.0/query#run_inline_query
 */
const ApiQueryFrontendComponent = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [queryBody, setQueryBody] = useState({
    "model": "reference_implementation",
    "view": "order_items",
    "fields": ["order_items.status", "order_items.total_sale_price"],
  })
  const [resultFormat, setResultFormat] = useState('json')
  const [dataset, setDataset] = useState([]);

  useEffect(() => {
    console.log('queryBody', queryBody)
    console.log('resultFormat', resultFormat)
    runQuery(queryBody, resultFormat)
  }, [queryBody, resultFormat])
  
  /**
   * Gets data using a run_inline_query call
   * @param {*} queryBody - Object matching the Query type. Required properties: model, view (explore), fields
   * @param {*} resultFormat - Data response formats: json | json_detail | csv
   */
  const runQuery = async (queryBody, resultFormat) => {
    console.log('runQuery()', Date.now())
    try {
      const queryResults = await sdk.ok(
        sdk.run_inline_query({
          body: queryBody, 
          result_format: resultFormat
        })
      )
      setDataset(queryResults)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setError('Error when attempting to run query: ' + error.message)
    }
  };

  return (
    <>
      {isLoading && <RenderLoading/>}
      {error !== '' && <RenderError message={error}/>}
      {dataset.length > 0 && <Space m="medium">{JSON.stringify(dataset)}</Space>}
    </>
  );
}

const RenderLoading = () => {
  return (<Space p="medium"><Spinner></Spinner></Space>)
};

const RenderError = (props) => {
  return (<Space p="small"><Status intent="critical" />{props.message}</Space>)
};


export default ApiQueryFrontendComponent