import {store} from '../../../../../store/store';
import {Bitfinex} from "./Realtime/Bitfinex";
import {Poloniex} from './Realtime/Poloniex';
const Singleton = (function () {
  let lastExchange = null;
  let lastTimeframe = null;
  let lastAsset = null;


  function lastSubscriptionIsSameAsNew(exchange, asset, timeframe) {
    return lastExchange === exchange && lastAsset === asset && lastTimeframe === timeframe;
  }

  function setLast(exchange, asset, timeframe) {
    lastExchange = exchange;
    lastAsset = asset;
    lastTimeframe = timeframe;
  }

  function Subscribe(exchange, timeframe, asset,assetApi)
  {
    if (lastSubscriptionIsSameAsNew(exchange, asset, timeframe))
    {
      return;
    }
    setLast(exchange, asset, timeframe);
    ExchangeFactory(exchange, asset, timeframe,assetApi);
  }

  function ExchangeFactory(exchange, asset, timeframe,assetApi)
  {
    if (exchange === 'bitfinex')
    {
      Poloniex.unsubscribe();
      Bitfinex.subscribe(exchange, asset, timeframe);
    }
    if (exchange === 'poloniex')
    {
      Bitfinex.unsubscribe();
      Poloniex.subscribe(exchange, asset, timeframe,assetApi);

    }
  }

  return {
    subscribe: function (exchange, asset, time,assetApi) {
      Subscribe(exchange, time, asset,assetApi);
    }
  }
})();
export {Singleton};

