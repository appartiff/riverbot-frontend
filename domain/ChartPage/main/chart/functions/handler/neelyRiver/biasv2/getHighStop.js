export function getHighStop(plot, current,lastCircle)
{
  let count = 0;
  let price = 0;
  let lowestPrice = plot[current];
  for (let i = current; i > lastCircle.index; i--)
  {
    let item = plot[i];
    if(item.isLow() && item.y < lowestPrice.y)
    {
      lowestPrice = item;
      lowestPrice.index = i;
    }
  }
  let enabled = false;

  for (let i = lowestPrice.index; i > lastCircle.index; i--)
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
      if (item.ohlc.y[1] > price && (item.high || item.high === false))
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
  return lastCircle.plot;
}
