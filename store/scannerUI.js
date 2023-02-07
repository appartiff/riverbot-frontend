export const state = {
  showSidebar: true,
};
export const mutations = {
  setSidebarShow: (state, condition) => {
    state.showSidebar = condition;
  },

};

export const actions =
  {
    setSidebarShow: ({commit},condition) =>
    {
      commit('setSidebarShow', condition)
    },
  };
