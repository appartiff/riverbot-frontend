
export const state = () => ({
  exchange: [],
  selected_asset:{
    asset:"",
    exchange:""
  },
  selected_timeframe:{
    timeframe:"5min",
    value:5
  },
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
  state.exchange = payload.exchange.filter((x) => x.enabled = true)
    state.selected_asset.exchange = state.exchange[0].name
    state.selected_asset.asset = state.exchange[0].tickers[0].asset

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
      let assets = []

      state.exchange.forEach((exchange) => {
        exchange.tickers.forEach((ticker) => {
          assets.push({
            asset: ticker.asset,
            exchange: exchange.name
          })
        })
      })
      var resArr = [];
      assets.filter(function(item){
        var i = resArr.findIndex(x => (x.asset == item.asset && x.exchange == item.exchange));
        if(i <= -1){
          resArr.push(item);
        }
        return null;
      });
      return resArr
    }
};

