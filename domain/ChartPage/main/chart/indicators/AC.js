import {Sma} from "./Sma";
import {MedianLog} from "./MedianLog";

export function Ac(ao,ohlc)
{
  let median = MedianLog(ohlc);
  let resultAO = ao.map(a => a.y);
  let smaOfAo = Sma(resultAO, 5);
  let ac = [];
  for (var i = 0; i < median.length; ++i)
  {
    ac.push({y:resultAO[i] - smaOfAo[i],x:ohlc[i].x});
  }
  return ac;
}
