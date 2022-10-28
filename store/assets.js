
export const state = () => ({
  assets: [],

  timeframes:[
    {
      timeframe:"5min",
      value:5
    },
    {
      timeframe:"15min",
      value:15
    },
    {
      timeframe:"30min",
      value:30
    },
    {
      timeframe:"1hour",
      value:60
    },
    {
      timeframe:"2hour",
      value:120
    },
    {
      timeframe:"4hour",
      value:240
    },
    {
      timeframe:"Daily",
      value:1440
    }]
})

export const mutations = {
  SET_ASSETS(state, payload) {
  state.assets = payload[0].tickers;
},
}
export const actions = {
 async getAssets({commit}) {
   let res = await this.$repositories.assets.getEnabledAssets();
   const { status, data } = res
   if (status === 200)
   {
     commit('SET_ASSETS', data);
   } else {

   }

  }
};
export const getters = {
    getFormattedAssets: (state) => {
      return state.assets.filter(thing => thing.asset.toLowerCase().includes(asset.toLowerCase()))
    }
};

