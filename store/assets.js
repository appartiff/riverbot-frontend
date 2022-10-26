
export const state = () => ({
  assets: [],
  timeframes:["5min","15min","30min","1hour","2hour","4hour","Daily"]
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

