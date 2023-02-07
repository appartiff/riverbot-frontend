
function getHighestPriceAndIndexBetween(plot,current,lastCircle)
{
  let highestPrice = plot[current];
  for (let i = current; i > lastCircle.index; i--)
  {
    let item = plot[i];
    if(item.isHigh() && item.y > highestPrice.y)
    {
      highestPrice = item;
      highestPrice.index = i;
    }
  }
  return highestPrice;
}
export function getLowStop(plot, current,lastCircle)
{
  let count = 0;
  let price = 0;

  let highestPrice = getHighestPriceAndIndexBetween(plot, current,lastCircle);
  let enabled = false;
  for (let i = highestPrice.index; i > lastCircle.index; i--)
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
      if (item.ohlc.y[2] < price)
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
  return lastCircle.plot;
}
