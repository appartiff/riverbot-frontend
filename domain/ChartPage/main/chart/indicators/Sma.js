export function Sma (price,period)
{
  let sma = [];
  let sum = 0;
  for (let i = 0; i < period; i++)
  {
    sum += price[i];
    sma.push(sum / (i + 1));
  }
  for (let i = period; i < price.length; i++)
  {
    sum = 0;
    for (let j = i; j > i - period; j--)
    {
      sum += price[j];
    }
    sma.push(sum / period);
  }
  return sma;
}
