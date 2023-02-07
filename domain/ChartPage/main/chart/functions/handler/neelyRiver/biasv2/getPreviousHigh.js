export function getPreviousHigh(plot, current, end = 0)
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
      price = item.ohlc.y[1];
      count++;
    }
    if (enabled)
    {
      if (item.ohlc.y[1] > price)
      {
        count++;
        price = item.ohlc.y[1];
      }
      if (count === 4)
      {
        return item;
      }
    }
  }
  return null;
}
