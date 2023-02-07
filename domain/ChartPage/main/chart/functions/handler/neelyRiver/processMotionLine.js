import {PlotObj} from "./objects/plot";

export function ProcessMotionLine(plot, ohlc)
{
  function PushHigh(previous, currentOhlc, plot, outsidebar = 0,i,ohlc)
  {
    let color = "#909090";

    previous =
      {
        x: currentOhlc.x,
        y: currentOhlc.y,
        high: true,
      };
    plot.push(new PlotObj(true,currentOhlc.x,currentOhlc.y[1],ohlc[i],color));
    return previous;
  }

  function PushLow(previous, currentOhlc, plot, outsidebar = 0,i,ohlc)
  {
    let color = "#909090";
    previous = {
      x: currentOhlc.x,
      y: currentOhlc.y,
      high: false,
    };

    plot.push(new PlotObj(false,currentOhlc.x,currentOhlc.y[2],ohlc[i],color));
    return previous;
  }

  /**
   * @return {boolean}
   */
  function Upbar(currentOhlc)
  {
    return currentOhlc.y[1] > previous.y[1] && currentOhlc.y[2] >= previous.y[2];
  }

  /**
   * @return {boolean}
   */
  function DownBar(currentOhlc) {
    return currentOhlc.y[2] < previous.y[2] && currentOhlc.y[1] <= previous.y[1];
  }

  /**
   * @return {boolean}
   */
  function BearishViolentBar(currentOhlc) {
    for (let a = plot.length - 1; a >= 0; a--)
    {
      let backwardo = plot[a];
      if (backwardo.y > currentOhlc.y[1])
      {
        break;
      }
      if (backwardo.y > currentOhlc.y[2] && backwardo.high === false) {
        return true;
      }

      if(backwardo.high === false)
      {
        return false;
      }
    }
    return false;
  }

  /**
   * @return {boolean}
   */
  function BullishViolentBar(currentOhlc)
  {
    for (let a = plot.length - 1; a >= 0; a--)
    {
      let backwardo = plot[a];
      if (backwardo.y < currentOhlc.y[2])
      {
        break;
      }
      if (backwardo.y < currentOhlc.y[1] && backwardo.high === true) {
        return true;
      }
      if(backwardo.high === true)
      {
        return false;
      }
    }
    return false;
  }

  if (ohlc.length <= 1)
  {
    return;
  }

  let motionOhlc = [];
  for (let i = 0; i < ohlc.length; i++)
  {
    let item = ohlc[i];

    if(i ===0)
    {
      motionOhlc.push({x:item.x,  y:[0,item.y[1], item.y[2],0]});
      continue;
    }
    let prev = ohlc[i-1];

    if(item.y[1] < prev.y[2])
    {
      motionOhlc.push({x:item.x, y:[0,prev.y[1],item.y[2],0]});
    }
    else if(item.y[2] > prev.y[1])
    {
      motionOhlc.push({x:item.x, y:[0,item.y[1],prev.y[2],0]});
    }
    else
    {
      motionOhlc.push({x:item.x, y:[0,item.y[1],item.y[2],0]});
    }
  }

  //high or low came first?
  let highest = ohlc[0].y[1];
  let lowest = ohlc[0].y[2];
  let highestIndex = 0;
  let lowestIndex = 0;

  for (let i = 0; i < ohlc.length; i++)
  {
    let high = ohlc[i].y[1];
    let low = ohlc[i].y[2];
    if(high > highest)
    {
      highest = high;
      highestIndex = i;
    }
    if(low < lowest)
    {
      lowest = low;
     lowestIndex = i;
    }
  }
  let start = lowestIndex < highestIndex ? lowestIndex : highestIndex;
  //start = start ===0 ? 1:start;
  start = 1;
  let previous = {y: motionOhlc[start-1].y, high: null};

  // if(lowestIndex < highestIndex)
  // {
  //   previous = PushLow(previous, motionOhlc[start], plot,0,start,ohlc);
  // }
  // else
  // {
  //   previous = PushHigh(previous,motionOhlc[start], plot,0,start,ohlc);
  // }

  for (let i = start; i < motionOhlc.length; i++)
  {
    let currentOhlc = motionOhlc[i];
    //up bar

    if(i === 1)
    {
      if (Upbar(currentOhlc))
      {
        PushLow(previous, motionOhlc[0], plot,0,0,ohlc);
      }
      //down bar
      if (DownBar(currentOhlc))
      {
        PushHigh(previous, motionOhlc[0], plot,0,0,ohlc);
      }
    }


    if (Upbar(currentOhlc))
    {
      previous = PushHigh(previous, currentOhlc, plot,0,i,ohlc);
    }
    //down bar
    if (DownBar(currentOhlc))
    {
      previous = PushLow(previous, currentOhlc, plot,0,i,ohlc);
    }
    //bullish outsidebar
    if (previous.high === true && currentOhlc.y[1] > previous.y[1] && currentOhlc.y[2] < previous.y[2])
    {
      let violent = BearishViolentBar(currentOhlc);
      if (violent) {
        previous = PushHigh(previous, currentOhlc, plot, 2,i,ohlc);
        previous = PushLow(previous, currentOhlc, plot, 2,i,ohlc);
      } else {
        previous = PushHigh(previous, currentOhlc, plot, 1,i,ohlc);
      }
    }
    //bearish outsidebar
    if (previous.high === false && currentOhlc.y[1] > previous.y[1] && currentOhlc.y[2] < previous.y[2])
    {
      let violent = BullishViolentBar(currentOhlc);
      if (violent)
      {
        previous = PushLow(previous, currentOhlc, plot, 2,i,ohlc);
        previous = PushHigh(previous, currentOhlc, plot, 2,i,ohlc);
      } else {
        previous = PushLow(previous, currentOhlc, plot, 1,i,ohlc);
      }
    }
  }
}
