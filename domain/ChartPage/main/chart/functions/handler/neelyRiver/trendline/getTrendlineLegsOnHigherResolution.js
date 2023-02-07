export function getTrendlineLegsOnhigherResolution(plotX5) {
  let stage = 0;
  let high = null;
  let firstHigh = null;
  let legs = {
    leg1: null,
    leg2: null,
    leg3: null,
    leg4: null,
    firstHigh:null,
  };

  for (let i = plotX5.length - 1; i >= 0; i--)
  {
    let item = plotX5[i];

    if (stage === 0)
    {
      high = item.high;
      firstHigh = item.high;
      legs.firstHigh = item.high;
      stage++;
      continue;
    }
    let next = plotX5[i+1];
    if (stage <= 4)
    {
      if (item.high !== high)
      {
        high = item.high;
        if (stage === 1)
          legs.leg1 = {plot: item,next:next};
        if (stage === 2)
          legs.leg2 = {plot: item,next:next};
        if (stage === 3)
          legs.leg3 = {plot: item,next:next};
        if (stage === 4)
          legs.leg4 = {plot: item,next:next};
        stage++;
      }
    }
    else
      break;
  }
  return legs;
}
