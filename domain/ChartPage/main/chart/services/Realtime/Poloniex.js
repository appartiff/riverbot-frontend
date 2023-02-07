import {store} from '../../../../../../store/store';
import Axios from "axios";

const Poloniex = (function () {

  function processCandle(data) {
    if (data.length === 2) {
      let candle = data[1];

      let payloadCandle = {
        x: candle.date * 1000,
        y: [
          candle.open,
          candle.high,
          candle.low,
          candle.close
        ]};

      let payload = {exchange: 'poloniex', 'candle': payloadCandle};
      store.commit('chartCandles/setLastCandle', payload);

    }
  }

  const poloniexTimeframes =
    {
      '15min': '900',
      '30min': '1800',
      '2hour': '7200',
      '4hour': '14400',
      'Daily': '86400'
    };


  let selectedExchange = '';
  let selectedAsset = '';
  let selectedTimeframe = '';
  let selectedAssetApi = '';
  // set timeout
  let timer = null;

  function mycode() {

    get();
    timer = setTimeout(mycode, 10000); // repeat myself
  }

  function get() {
    let unix = Date.now() / 1000;
    let subtract = Number(selectedTimeframe);
    let startDate = unix - subtract;
    Axios
      .get(`https://poloniex.com/public?command=returnChartData&currencyPair=${selectedAssetApi}&start=${startDate}&period=${selectedTimeframe}`)
      .then(response => response.data).then(data => {
      processCandle(data);
    });
  }

  function abortTimer() {
    clearTimeout(timer);
  }

  function Subscribe(exchange, timeframe, asset, assetApi) {
    abortTimer();
    selectedExchange = exchange;
    selectedTimeframe = poloniexTimeframes[timeframe];
    selectedAsset = asset;
    selectedAssetApi = assetApi;

    get();

    timer = setTimeout(mycode, 10000);


  }

  return {
    subscribe: function (exchange, asset, time, assetApi) {
      Subscribe(exchange, time, asset, assetApi);
    },
    unsubscribe: function () {
      abortTimer();
    },
  }
})();
export {Poloniex};

