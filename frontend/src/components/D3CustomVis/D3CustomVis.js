import React, { useEffect, useState } from "react";

import {
  Space,
  Status,
  Spinner
} from "@looker/components";

import { sdk } from "../../helpers/CorsSessionHelper"

import { getQueryResponseFromJsonDetail } from './helpers'
import { 
  getPivots,
  getDimensions,
  getMeasures,
  getDataAndRanges,
} from './ForceBubbles/force-bubbles-model'
import ForceBubbles from './ForceBubbles/ForceBubbles'

/**
 * Displays a custom vis
 * - Uses the Query API: https://docs.looker.com/reference/api-and-integration/api-reference/v4.0/query#run_inline_query
 */
const D3CustomVisComponent = () => {
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

  const [visConfig, setVisConfig] = useState({
    colorBy: "products.department",
    groupBy: "products.category",
    sizeBy: "order_items.total_sale_price",
    scale: 1
  });

  const [visModel, setVisModel] = useState({});

  /**
   * 1. Gets data using a run_inline_query call
   * 2. Converts response into structure used by Looker Custom Visualization plugins
   * 3. Returns / displays the custom vis
   * 
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
      const data = jsonResponse.data
      const queryResponse = getQueryResponseFromJsonDetail(jsonResponse)

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
      
      setVisModel(visModel)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setError('Error when attempting to run query: ' + error.message)
    }
  };

  useEffect(() => {
    runQuery(queryBody, resultFormat)
  }, [queryBody, resultFormat])
  
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


export default D3CustomVisComponent