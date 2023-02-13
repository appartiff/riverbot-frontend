const resource = '/api/candles'
export default ($axios) => ({
  GetCandles() {
    return $axios.get(`${resource}/getgandles`)
  },
  GetMultipleChartCandles(exchange, timeframe, asset) {
  return $axios.get(`${resource}/getmultiplechartcandles`, {
    params: {
      'exchange': exchange,
      'timeframe': timeframe,
      'asset': asset
    }
  })
},

})
