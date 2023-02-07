export function getIsHighestHighOrLow(plot, current,blueCircle)
{
  let end = blueCircle.index;
  let HighestHigh = plot[current];
  let isHighest = true;
  let isLowest = true;
  for (let i = current-1; i >= end; i--)
  {
    let item = plot[i];
    if (item.ohlc.y[1] > HighestHigh.ohlc.y[1])
    {
      isHighest = false;
    }
    if (item.ohlc.y[2] > HighestHigh.ohlc.y[2])
    {
      isLowest = false;
    }

  }
  return (isLowest || isHighest);
}
