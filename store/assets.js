
import AssetsRepository from "../repositories/AssetsRepository";


export const state = () => ({
  assets: [],
})

export const mutations = {
  setAssets(state,payload)
  {
    state.assets = payload;
  },
}
export const actions = {
 async getAssets({commit}) {
    let res = await this.$repositories.assets.getAll();
   const { status, data } = res
   if (status === 200)
   {
     commit('setAssets', data);
   } else {

   }

  }
};
export const getters = {
    searchAssets: (state) => (asset) => {
      return state.assets.filter(thing => thing.asset.toLowerCase().includes(asset.toLowerCase()))
    }
};

