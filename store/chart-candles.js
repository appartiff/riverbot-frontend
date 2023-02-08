import axios from "axios";

import {signalrService} from "/services/SignalR";
export const state =
  {
    SignalRService : signalrService,
    ohlc: [],
    ohlcX5 :[],
    ohlcX25:[],
    ohlcX125:[],
    lastOhlc: null,
    chart1AxisXMaximum: 0,
    chart2AxisXMaximum: 0,
    chart3AxisXMaximum: 0,
    displayedTimeframes:'',
  };
export const mutations = {
  setLastCandle: (state, payload) =>
  {
    let candle = payload.candle;
    if (candle === null) {
      state.lastOhlc = null;
      return;
    }
    if (state.lastOhlc === null)
    {
      state.lastOhlc = {
        x: candle.x,
        y: candle.y
      };
    }
    if(payload.exchange ==='bitfinex')
    {
      if (state.lastOhlc.x <= candle[0])
      {
        state.lastOhlc = {
          x: candle.x,
          y: candle.y
        };
      }
    }
    if(payload.exchange === 'poloniex')
    {
      state.lastOhlc =
        {
          x: candle.x,
          y: candle.y
        };
    }
  },
  subscribeToRealTimeCandles: (state, payload) =>
  {
    let exchange = payload.exchange;
    let timeframe = payload.timeframe;
    let asset = payload.asset;
    state.SignalRService.subscribeToCandle(exchange, asset, timeframe);
  },
  setCandles: (state, candles) =>
  {
    if (candles.x1.length > 0)
    {
      state.displayedTimeframes = candles.timeframes;
      state.lastOhlc = null;
      state.ohlc = candles.x1;
      state.ohlcX5 = candles.x5;
      state.ohlcX25 = candles.x25;
      state.ohlcX125 = candles.x125;
    }
  },

  addCandles:(state,payload)=>
  {
    let candles = payload;
    for (let i = 0; i < candles.length; i++)
    {
      let item = candles[i];
      if(item.Date > state.ohlc[state.ohlc.length-1].x)
      {
        state.ohlc.push({x:item.Date,y:[item.Open,item.High,item.Close,item.Low]});
      }
    }
  },

  connectSignalR: (state) => {
    state.SignalRService.connect();
  },
  disconnectSignalr: (state) => {
    state.SignalRService.disconnect();
  },


  setmaxPort: (state) =>
  {
    let ohlc = state.ohlc;
    let ohlcX5 = state.ohlcX5;
    let ohlcX25 = state.ohlcX25;
    let ohlcCollection = [ohlc,ohlcX5,ohlcX25];
    for (let i = 0; i <  ohlcCollection.length; i++)
    {
      let ohlc = ohlcCollection[i];
      if (ohlc.length > 2)
      {
        let single = ohlc[ohlc.length - 1].x - ohlc[ohlc.length - 2].x;
        var nice = single * (ohlc.length * 0.2);
        if(i===0)
          state.chart1AxisXMaximum=ohlc[ohlc.length - 1].x + nice;
        if(i===1)
          state.chart2AxisXMaximum =ohlc[ohlc.length - 1].x + nice;
        if(i===2)
          state.chart3AxisXMaximum =ohlc[ohlc.length - 1].x + nice;
      }
    }


  },
};

export const getters = {

};



export const actions =
  {
    loadCandles: ({commit, state, dispatch,rootState}, payload = {}) =>
    {
      if (Object.entries(payload).length === 0 && payload.constructor === Object)
      {
        payload.exchange = rootState.chartNavigation.selectedExchange;
        payload.timeframe = rootState.chartNavigation.selectedTimeframe;
        payload.asset = rootState.chartNavigation.selectedAsset;
      }
      axios
        .get('/api/candles/getmultiplechartcandles', {
          params: {
            'exchange': payload.exchange,
            'timeframe': payload.timeframe,
            'asset': payload.asset
          }
        })
        .then(response => response.data).then(assets =>
      {
        dispatch('setCandles', assets);
        dispatch('subscribeToRealTimeCandles',payload);
        commit('setmaxPort');
      });
    },
    subscribeToRealTimeCandles:({commit},payload) =>
    {
      commit('subscribeToRealTimeCandles',payload);
    },
    setCandles:({commit},assets)=>
    {
      commit('setCandles', assets);
    },
    addCandles: ({commit, state, dispatch,rootState}) =>
    {
      let exchange = rootState.chartNavigation.selectedExchange;
      let timeframe = rootState.chartNavigation.selectedTimeframe;
      let asset = rootState.chartNavigation.selectedAsset;
      let lastTimestamp =state.ohlc[state.ohlc.length-1].x;
      axios
        .get('/api/candles/getcandlesnewerthan', {
          params: {
            'exchange': exchange,
            'timeframe': timeframe,
            'asset': asset,
            'timestamp':lastTimestamp
          }
        })
        .then(response => response.data).then(assets =>
      {
        commit('addCandles',assets);
      });
    },
    SET_COINS: ({commit, dispatch}, payload) =>
    {
      commit('SET_COINS', payload);
      dispatch('loadCandles');
    },
  };
