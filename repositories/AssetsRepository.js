const resource = '/api/assets'
export default ($axios) => ({
  getAll() {
    return $axios.get(`${resource}/getallassets`)
  },

  getAssets: (enabled) =>$axios.get(`${resource}/getassets${enabled !== undefined ? '?enabled='+enabled :''}`),
  getEnabledAssets(){
    return $axios.get(`${resource}/GetEnabledAssets`)
  },
  getTimeframes:()=>$axios.get(`${resource}/gettimeframes`),
  get(id) {
    return $axios.get(`${resource}/${id}`)
  },
  update(id, payload) {
    return $axios.post(`${resource}/${id}`, payload)
  },
})
