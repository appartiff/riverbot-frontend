
export function  MedianLog(ohlc)
{
  let median = [];
  if (ohlc.length === 0)
    return median;
  for (let i = 0; i < ohlc.length; i++)
  {
    let average = (Math.log(ohlc[i].y[1])  +  Math.log(ohlc[i].y[2])) / 2;
    median.push(average);
  }
  return median;
}
