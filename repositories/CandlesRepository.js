const resource = '/api/candles'
export default ($axios) => ({
  GetCandles() {
    return $axios.get(`${resource}/getgandles`)
  },
  GetMultipleChartCandles() {
  return $axios.get(`${resource}/getmultiplechartcandles`)
},

})
