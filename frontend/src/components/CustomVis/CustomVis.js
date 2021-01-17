import React, { useEffect, useState } from "react";

import {
  Space,
  Status,
  Spinner
} from "@looker/components";

import { getQueryResponseFromJsonDetail } from './helpers'
import { 
  getPivots,
  getDimensions,
  getMeasures,
  getDataAndRanges,
} from './force-bubbles-model'
import ForceBubbles from './ForceBubbles'
import { sdk } from "../../helpers/CorsSessionHelper"


/**
 * Runs a simple query on load (to populate an HTML table)
 * - Uses the Query API: https://docs.looker.com/reference/api-and-integration/api-reference/v4.0/query#run_inline_query
 */
const CustomVisComponent = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [queryBody, setQueryBody] = useState({
    model: "reference_implementation",
    view: "order_items",
    fields: [
      "products.department",
      "products.category",
      "products.count",
      "order_items.total_sale_price"
    ],
    pivots: [
      "products.department"
    ],
    filters : {
      "order_items.created_at_year": "2 years"
    },
    row_total: "true",
    limit: 10,
  })

  const [resultFormat, setResultFormat] = useState('json_detail')

  const [visModel, setVisModel] = useState({});

  const [visConfig, setVisConfig] = useState({
    colorBy: "products.department",
    groupBy: "products.category",
    sizeBy: "order_items.total_sale_price",
    scale: 1
  });

  useEffect(() => {
    runQuery(queryBody, resultFormat)
  }, [queryBody, resultFormat])
  
  /**
   * Gets data using a run_inline_query call
   * @param {*} queryBody - Object matching the Query type. Required properties: model, view (explore), fields
   * @param {*} resultFormat - Data response formats: json | json_detail | csv
   */
  const runQuery = async (queryBody, resultFormat) => {
    try {
      const jsonResponse = await sdk.ok(
        sdk.run_inline_query({
          body: queryBody, 
          result_format: resultFormat
        })
      )
      console.log('jsonResponse', jsonResponse)
      const data = jsonResponse.data
      const queryResponse = getQueryResponseFromJsonDetail(jsonResponse)
      console.log('queryResponse', queryResponse)

      var visModel = {
        pivot_fields: [],
        pivot_values: [],
        dimensions: [],
        measures: [],
        data: [],
        ranges: {}
      }
      visModel.pivot_values = queryResponse.pivots.filter(p => p.key !== '$$$_row_total_$$$')
      getPivots(queryResponse, visModel)
      getDimensions(queryResponse, visModel)
      getMeasures(queryResponse, visModel)
      getDataAndRanges(data, visConfig, visModel)
      console.log('visModel()', visModel)
      
      setVisModel(visModel)
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
      {visModel.data?.length > 0 && 
        <ForceBubbles
          colorBy={visConfig.colorBy}
          groupBy={visConfig.groupBy}
          sizeBy={visConfig.sizeBy}
          scale={visConfig.scale}

          data={visModel.data}
          ranges={visModel.ranges}
          
          width={1400}
          height={600}
        />
      }
    </>
  );
}

const RenderLoading = () => {
  return (<Space p="medium"><Spinner></Spinner></Space>)
};

const RenderError = (props) => {
  return (<Space p="small"><Status intent="critical" />{props.message}</Space>)
};


export default CustomVisComponent