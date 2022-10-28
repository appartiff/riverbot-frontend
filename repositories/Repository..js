import AssetsRepository from './AssetsRepository'
import CandlesRepository from "~/repositories/CandlesRepository";
export default ($axios) => ({
  assets: AssetsRepository($axios),
  candles:CandlesRepository($axios)
})
