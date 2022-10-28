const resource = '/api/candles'
export default ($axios) => ({
  GetCandles() {
    return $axios.get(`${resource}/GetCandles`)
  },
  GetMultipleChartCandles() {
  return $axios.get(`${resource}/GetMultipleChartCandles`)
},

})
