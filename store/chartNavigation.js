
export const state =
  {
    assets: {},
    selectedNav: null,
    displayedExchange: 'okex',
    selectedChartType: 'Bar',
    selectedExchange: 'okex',
    selectedAsset: '',
    selectedAssetApi: '',
    selectedTimeframe: '',
    timeframes:
      {
        okex: ['15min', '30min', '1hour','2hour','3hour',  '4hour', '6hour', '8hour','Daily', 'Weekly','Monthly'],
        deribit: ['15min', '30min', '1hour','2hour','3hour',  '4hour', '6hour', '8hour','Daily', 'Weekly','Monthly'],
      },
  };

export const actions =
  {
    initializeScanner: ({commit, dispatch}, payload) =>
    {
      dispatch('loadAssets', payload).then(function()
      {
        commit('setExchange', payload);
        commit('setTimeframe', payload.timeframe)
      })
      ;

    },
    async loadAssets({ commit }, payload)  {


      await this.$uow.assets.getAll()
          .then(response => response.data).then(assets => {
          commit('SET_COINS', assets);
        });
    },
    setTimeframe: ({commit, dispatch}, payload) =>
    {
      commit('setTimeframe', payload);
      dispatch('chart-candles/loadCandles', {}, {root: true});
    },

    setExchange: ({commit, dispatch}, payload) =>
    {
      commit('setExchange', payload);
      dispatch('chart-candles/loadCandles', {}, {root: true});
    },
    setDisplayedExchange: ({commit}, payload) =>
    {
      commit('setDisplayedExchange', payload);
    },

  };
export const getters = {
  isSelectedExchange: (state) => (exchange) => {
    if (state.displayedExchange === exchange) {
      return 'active';
    }
    return 'hide';
  },
  getAssets: (state) => (payload) =>
  {
    let market = payload.market;
    let exchange = payload.exchange;
    if(state.assets[market] && state.assets[market][exchange])
    {
      return state.assets[market] && state.assets[market][exchange];
    }
  },
  updateAssetBox: (state) =>
  {
    return `${state.selectedAsset} - ${state.selectedExchange}`
  }
};


export const mutations = {
  setDisplayedExchange: (state, payload) => {
    state.displayedExchange = payload;
  },

  setSelectedNav: (state, category) => {
    if (state.selectedNav !== category) {
      state.selectedNav = category;
    } else {
      state.selectedNav = null;
    }
  },
  setSelectedChartType:(state,payload) =>
  {
    state.selectedChartType = payload;
  },

  setExchange (state, payload)  {
    console.log(payload);
    let timeframe = state.timeframes[payload.exchange];

    const exists = timeframe.find(person => person === state.selectedTimeframe);
    if (exists === undefined)
    {
      const selectedTimeframe =  state.timeframes[payload.exchange][0];
      state.selectedTimeframe = selectedTimeframe;

    }
    let asset = '';
    if (Number.isInteger(payload.assetIndex))
    {
      asset = state.assets[payload.market][payload.exchange][payload.assetIndex];

    } else {
      asset = state.assets[payload.market][payload.exchange].find(element => element.asset === payload.assetIndex);
    }
    state.selectedAssetApi = asset.apiAsset;
    state.selectedExchange = payload.exchange;
    state.selectedAsset = asset.asset;
    this.$router.push({name: 'chart', params: {market:payload.market, asset: asset.asset,exchange:payload.exchange}});
  },

  setTimeframe (state, index)  {
    let timeframe = '';
    if (Number.isInteger(index))
    {
      timeframe = state.timeframes[state.selectedExchange][index];
    } else {
      timeframe = state.timeframes[state.selectedExchange].find(element => element === index);
    }

    state.selectedTimeframe = timeframe;
    this.$router.push({name: 'chart', params: {timeframe:timeframe}});
  },
  SET_COINS: (state, coins) =>
  {
    state.assets = coins;
  }
};
