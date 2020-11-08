import React, { useEffect, useState } from "react";

import {
  Space,
  Status,
  Spinner
} from "@looker/components";

import { sdk } from "../../helpers/CorsSessionHelper"


const ClientSideDataQueryComponent = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [dataset, setDataset] = useState([]);

  const queryBody = {
    "model": "reference_implementation",
    "view": "order_items",
    "fields": ["order_items.status", "order_items.total_sale_price"],
  }

  useEffect(() => {
    runQuery()
  })
  
  const runQuery = async () => {
    try {
      const queryResults = await sdk.ok(
        sdk.run_inline_query({
          body: queryBody, 
          result_format: 'json'
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


export default ClientSideDataQueryComponent