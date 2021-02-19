const resource = '/api/assets'
export default ($axios) => ({
  getAll() {
    return $axios.get(`${resource}/getassets`)
  },
  getAssets: (enabled) =>$axios.get(`${resource}/getassets${enabled !== undefined ? '?enabled='+enabled :''}`),
  getAllEnabled(){
    return $axios.get(`${resource}/getassets?enabled=true`)
  },
  getTimeframes:()=>$axios.get(`${resource}/gettimeframes`),
  get(id) {
    return $axios.get(`${resource}/${id}`)
  },
  update(id, payload) {
    return $axios.post(`${resource}/${id}`, payload)
  },
})
