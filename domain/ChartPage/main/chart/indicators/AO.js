import {Sma} from "./Sma";
import {MedianLog} from "./MedianLog";

export function AwesomeOscillator(ohlc)
{
  let median = MedianLog(ohlc);
  let fastSma = Sma(median, 5);
  let slowSma = Sma(median, 34);
  let ao = [];
  for (let i = 0; i < median.length; i++)
  {
    ao.push({y:fastSma[i]  - slowSma[i],x:ohlc[i].x});
  }
  return ao;
}



