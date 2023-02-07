export function getHighestPrice(plot, current,end =0)
{
  let highestPrice = plot[current];
  for (let i = current; i >= end; i--)
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
export function getLowestPrice(plot, current,end = 0)
{
  let lowestPrice = plot[current];
  for (let i = current; i >= end; i--)
  {
    let item = plot[i];
    if(item.isLow() && item.y < lowestPrice.y)
    {
      lowestPrice = item;
      lowestPrice.index = i;
    }
  }
  return lowestPrice;
}
