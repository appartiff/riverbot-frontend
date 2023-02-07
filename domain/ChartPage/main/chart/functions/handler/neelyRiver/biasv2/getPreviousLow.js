export function getPreviousLow(plot, current,end = 0)
{
  let count = 0;
  let enabled = false;
  let price = 0;
  for (let i = current; i >= end; i--)
  {
    let item = plot[i];
    if (enabled === false)
    {
      enabled = true;
      price = item.ohlc.y[2];
      count++;
    }
    if (enabled)
    {
      if (item.ohlc.y[2] < price && (item.high || item.high === false))
      {
        count++;
        price = item.ohlc.y[2];
      }
      if (count === 4)
      {
        return item;
      }
    }
  }
  return null;
}
