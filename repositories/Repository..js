import AssetsRepository from './AssetsRepository'
export default ($axios) => ({
  assets: AssetsRepository($axios),
})
