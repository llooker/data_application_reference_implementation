const getQueryResponseFromJsonDetail = (jsonDetail) => {
  var queryResponse = {
    data: jsonDetail.data,
    pivots: jsonDetail.pivots || [],
    fields: {
      pivots: jsonDetail.fields.pivots,
      dimension_like: [
        ...jsonDetail.fields.dimensions,
        ...jsonDetail.fields.table_calculations.filter(calc => !calc.measure)
      ],
      measure_like: [
        ...jsonDetail.fields.measures,
        ...jsonDetail.fields.table_calculations.filter(calc => calc.measure && calc.can_pivot)
      ],
      supermeasure_like: jsonDetail.fields.table_calculations.filter(calc => calc.measure && !calc.can_pivot),
    }
  }

  return queryResponse
}

export { getQueryResponseFromJsonDetail }