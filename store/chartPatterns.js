export const mutations = {

  setEnabledPattern: (state, payload) =>
  {
    state.patternsConfig[payload.name].enabled = payload.value = !payload.value;
  },
  setDisplayChannel: (state, payload) =>
  {
    state.patternsConfig.river.channel.zones =  !payload;
  },
};
export const state =
  {
    patternsConfig:
      {
        river:
          {
            enabled: true,
            channel:
              {
                zones:true,

              }

          },
      },
  };
