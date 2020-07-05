export const state = () => ({
  selectedSidebar: 'chart',
  showSidebar:true
})

export const mutations = {
  setSidebar(state, payload)  {
    state.selectedSidebar = payload;
  },
  toggleShowSidebar(state){
    state.showSidebar = !state.showSidebar;
  }
}
