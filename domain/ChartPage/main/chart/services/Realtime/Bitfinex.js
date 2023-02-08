import {store} from '../../../../../../store/store';

const Bitfinex = (function () {
  let subscribedChannel = null;

  let exchange = 'bitfinex';
  let w = new WebSocket("wss://api-pub.bitfinex.com/ws/2");


  w.onopen = function (e) {
    console.log("[open] Connection established, send -> server");
  };
  w.onmessage = function (event) {
    console.log(`[message] Data received: ${event.data} <- server`);
  };
  w.onclose = function (event) {
    if (event.wasClean) {
      console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
      // e.g. server process killed or network down
      // event.code is usually 1006 in this case
      console.log('[close] Connection died');
    }
  };
  w.onerror = function (error) {
    alert(`[error] ${error.message}`);
  };
  w.onmessage = (msg) => {
    let data = JSON.parse(msg.data);
    processSubscription(data);
    processCandle(data);

  };

  function processCandle(data) {
    console.log(data);
    //bitfinex
    if (data.length === 2)
    {

      if (data[1].length === 240)
      {
        let  candle = data[1][0];
        let payloadCandle ={x:candle[0], y: [candle[1], candle[3], candle[4], candle[2]]};
        let payload = {exchange:exchange,'candle':payloadCandle};
        store.commit('chart-candles/setLastCandle',payload);
      }
      if (data[1].length === 6) {
        let candle = data[1];
        let payloadCandle ={x:candle[0], y: [candle[1], candle[3], candle[4], candle[2]]};
        let payload = {exchange:exchange,'candle':payloadCandle};
        store.commit('chart-candles/setLastCandle', payload);
      }
      //console.log(candle);
    }
    if (data.length === 240) {

    }
  }

  function processSubscription(data) {
    if (data.event !== undefined) {
      if (data.event === 'subscribed') {
        subscribedChannel = data.chanId;
      }
    }
  }

  function Unsubscribe() {
    if (!w || w.readyState === 3) {
      return;
    }
    if (subscribedChannel !== null) {
      let msg = JSON.stringify({
        event: 'unsubscribe',
        chanId: subscribedChannel,
      });
      w.send(msg);
      console.log('bitfinex unsubscribed');
    }
  }

  const bitfinexTimeframes =
    {
      '15min': '15m',
      '30min': '30m',
      '1hour': '1h',
      '3hour': '3h',
      '6hour': '6h',
      'Daily': '1D'
    };

  function Subscribe(exchange, timeframe, asset) {
    let selectedTimeframe = bitfinexTimeframes[timeframe];
    let key = `trade:${selectedTimeframe}:t${asset}`;
    waitForSocketConnection(w, function () {
      Unsubscribe();
      let msg = JSON.stringify(
        {
          event: 'subscribe',
          channel: 'candles',
          key: key,
        });
      w.send(msg);
    });
  }

  function waitForSocketConnection(socket, callback) {
    setTimeout(
      function () {

        if (socket.readyState === 1) {
          if (callback != null) {
            callback();
          }
        } else {
          waitForSocketConnection(socket, callback);
        }
      }, 50);
  }

  return {
    subscribe: function (exchange, asset, time) {
      Subscribe(exchange, time, asset);
    },
    unsubscribe: function () {
      Unsubscribe();
    },

  }
})();
export {Bitfinex};

