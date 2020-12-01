import React from "react";
import { Table, TableHead, TableRow, TableHeaderCell, TableBody, TableDataCell } from '@looker/components';
/**
 * Helper function to reshape Looker query response into an object that can be plotted by the QueryTable component
 * @param  {Array} queryData - Array of Objects containing Looker query response data
 */
const reshapeQuery = (queryData) => {
    if (queryData.length == 0) {
      return {headers: [], rows: []}
    }  else {
      let sample = queryData[0],
      cols =  [],
      rows = Object.keys(queryData),
      data = [],
      l1_fields = Object.keys(sample); // dims unpivoted + measures pivoted
      l1_fields.map(k => !(sample[k] instanceof Object) ? cols.push(k) : Object.keys(sample[k]).map(k2 => (sample[k][k2] instanceof Object) && Object.keys(sample[k][k2]).map(k3 => cols.push(k3))))
      for (let i = 0; i < rows.length; i++ ) {
        let tmp = [],
        row = queryData[i]
        Object.keys(row).map(k => {
          if (!(row[k] instanceof Object)) {
            tmp.push(row[k])
            } else {
              Object.keys(row[k]).map(k2 => {
                if (row[k][k2] instanceof Object) {
                  Object.keys(row[k][k2]).map(k3 => {
                    tmp.push(row[k][k2][k3])
                  })
                }
              })
            }
        })
        data.push(tmp)
      }
      return {headers: cols, rows: data}
    }
  };

/**
 * Takes raw query response data and plots it as a Data Table using Looker Components.
 * Must appear in elements wrapped in Looker ComponentsProvider
 * Data is reshaped before plotting to accommodate pivots
 * @param  {Object} props - Properties from the parent component.
 * @param  {Array} props.data - Query returned by Looker API. This will be an array of Objects
 */
export const QueryTable = (props) => {
    const data = reshapeQuery(props.data),
    headers = data.headers,
    rows = data.rows;
    return (
        <Table>
            <TableHead>
                <TableRow>
                    {headers.map((h, i) => <TableHeaderCell key={i}>{h}</TableHeaderCell>)}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((r, i) => { 
                    return (
                        <TableRow key={i}>
                            {r.map((d, i2) => <TableDataCell key={i2}>{d}</TableDataCell>)}
                        </TableRow>
                    )
                    })}
            </TableBody>
        </Table>
    )

}