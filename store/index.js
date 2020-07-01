export const state = () => ({
  mobile: false,
  selectedSidebarIndex: 0,
})

export const mutations = {
  increment(state) {
    state.counter++
  },
  setSidebar(state, index)  {
    state.selectedSidebarIndex = index;
  },
  changeMobile(state, payload)
  {
    state.mobile = payload;
  }
}
export const actions = {
  changeMobile({commit}, payload) {
    commit('changeMobile', payload);
  }
};


