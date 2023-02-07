export function getIsLowestLowOrHigh(plot, current,blueCircle)
{
  let start = blueCircle.index;
  let lowestHigh = plot[current];
  let isHighest = true;
  let isLowest = true;
  for (let i = start+1; i < current; i++)
  {
    let item = plot[i];
    if (item.ohlc.y[1] < lowestHigh.ohlc.y[1])
    {
      isHighest = false;
    }
    if (item.ohlc.y[2] < lowestHigh.ohlc.y[2])
    {
      isLowest = false;
    }
  }

  return isLowest ||isHighest;
}
