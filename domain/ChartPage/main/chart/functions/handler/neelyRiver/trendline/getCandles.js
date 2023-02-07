import axios from "axios";

 export function getCandles(assets)
{
  return axios
    .get('/api/candles/getcandles5xresolution', {
      params: {
        'exchange': assets.exchange,
        'timeframe': assets.timeframe,
        'asset': assets.asset
      }
    })
    .then(response => response.data).then(assets =>
    {
      return assets;
    });

}
