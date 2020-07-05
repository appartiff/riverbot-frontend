import AssetsRepository from '~/repositories/AssetsRepository'
export default ($axios) => ({
  assets: AssetsRepository($axios),
})
