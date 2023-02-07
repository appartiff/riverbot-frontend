
import {plotNegative} from "./biasv2/plotNegative";
import {plotPositive} from "./biasv2/plotPositive";
import {getHighStop} from "./biasv2/getHighStop";
import {getLowStop} from "./biasv2/getLowStop";
import {getHighestPrice,getLowestPrice} from "./biasv2/getHighest";
import {getPreviousHigh} from "./biasv2/getPreviousHigh";
import {getPreviousLow} from "./biasv2/getPreviousLow";
import {getIsHighestHighOrLow} from "./biasv2/getIsHighestHighOrLow";
import {getIsLowestLowOrHigh} from "./biasv2/getIsLowestLowOrHigh";
import {Arrow} from "./objects/arrow";

function BlueCircle (plot,index)
{
  this.plot = plot;
  this.index = index;
}
function plotBlueCircle(chart, lastCircle)
{
  chart.options.data[6].dataPoints.push(
    {
      x: lastCircle.x,
      y: lastCircle.y,
      indexLabelFontColor: 'yellow',
      indexLabelFontSize:25,
    });
}


export function ProcessBias(plot, chart, ohlc)
{

  let positiveOrNegative = "";
  let stop = null;
  let lastCircle= new BlueCircle(plot[0],0);
  let arrow = null;
  let arrowPrice = null;
let negativePositivePlot = null;
  for (let i = 1; i < plot.length; i++)
  {
    let item = plot[i];
    //neutral
    if(positiveOrNegative === "")
    {
      if (item.isLow())
      {
        let previous4Lows = getLowStop(plot, i,lastCircle);
        if(previous4Lows === null)
          continue;
        //bias turned negative
        if(item.ohlc.y[2] < previous4Lows.ohlc.y[2])
        {
          //plotNegative(chart, item, previous4Lows);
          negativePositivePlot = item;
          let highestPrice = getHighestPrice(plot,i);
          //plotBlueCircle(chart,highestPrice);
          lastCircle= new BlueCircle(highestPrice,highestPrice.index);
          let setStop = getIsLowestLowOrHigh(plot,i,highestPrice);
          if(setStop)
            stop =  getPreviousHigh(plot,i);
          if(stop === null)
            stop = highestPrice;
          arrow = new Arrow('-',item,'bias',1,i);
          positiveOrNegative = '-';
        }
      }
      if(item.isHigh())
      {
        let previous4Highs = getHighStop(plot, i,lastCircle);
        if(previous4Highs === null)
          continue;
         if ( item.ohlc.y[1] > previous4Highs.ohlc.y[1] )
         {
           //plotPositive(chart, item, previous4Highs);
           negativePositivePlot = item;
           let lowestPrice = getLowestPrice(plot,i);
           let setStop = getIsHighestHighOrLow(plot,i,lowestPrice);
           if(setStop)
             stop =  getPreviousLow(plot,i,lowestPrice.index);
           if(stop === null)
             stop = lowestPrice;
           lastCircle= new BlueCircle(lowestPrice,lowestPrice.index);
            //plotBlueCircle(chart,lowestPrice);
           positiveOrNegative = '+';
           arrow = new Arrow('+',item,'bias',1,i);
         }
      }
    }
    //blue circle has been set,
    //stoploss has been set
    //positive
    if(positiveOrNegative === "-")
    {
      //recalculate stoploss
      if (item.isLow())
      {
        let setStop = getIsLowestLowOrHigh(plot,i,lastCircle);
        if(setStop)
        {
          let previousHigh =getPreviousHigh(plot,i,lastCircle.index);
          if(previousHigh !== null)
            stop =previousHigh;
        }
      }
      if(item.isHigh())
      {
        if(item.y > stop.ohlc.y[1])
        {
          //plotPositive(chart, item, stop);
          negativePositivePlot = item;
          arrowPrice = stop.ohlc.y[1];
          let lowestPrice = getLowestPrice(plot,i,lastCircle.index);
          let setStop = getIsHighestHighOrLow(plot,i,lowestPrice);
          if(setStop)
            stop =  getPreviousLow(plot,i,lowestPrice);
          if(stop === null)
            stop = lowestPrice;

          lastCircle= new BlueCircle(lowestPrice,lowestPrice.index);
         // plotBlueCircle(chart,lowestPrice);

          positiveOrNegative = '+';
          arrow = new Arrow('+',item,'bias',1,i);
        }
      }
    }

    if(positiveOrNegative === "+")
    {
      //recalculate stoploss
      if (item.isHigh())
      {
        let setStop = getIsHighestHighOrLow(plot,i,lastCircle);
        if(setStop)
        {
          let previousHigh = getPreviousLow(plot,i,lastCircle.index);
          if(previousHigh !== null)
            stop = previousHigh;
        }
      }
      if(item.isLow())
      {
        if(item.y < stop.ohlc.y[2])
        {
          //plotNegative(chart, item, stop);
          negativePositivePlot = item;
          arrowPrice = stop.ohlc.y[2];
          let highestPrice = getHighestPrice(plot,i,lastCircle.index);
          let setStop = getIsLowestLowOrHigh(plot,i,highestPrice);
          if(setStop)
            stop =  getPreviousHigh(plot,i,highestPrice.index);
          if(stop === null)
            stop = highestPrice;

          lastCircle= new BlueCircle(highestPrice,highestPrice.index);
         // plotBlueCircle(chart,highestPrice);
          positiveOrNegative = '-';
          arrow = new Arrow('-',item,'bias',1,i);
        }
      }
    }
  }

if(stop!==null)
{
  chart.options.data[6].dataPoints.push(
    {
      x: lastCircle.plot.x,
      y: lastCircle.plot.y,
      indexLabelFontSize:25,
      fillOpacity : .2,
    });

  if(positiveOrNegative === '-')
    plotNegative(chart, arrow.plot,arrowPrice);
  if(positiveOrNegative === '+')
    plotPositive(chart, arrow.plot,arrowPrice);

  let stopPlot = positiveOrNegative === '+' ? stop.ohlc.y[2] : stop.ohlc.y[1];
  chart.options.data[5].dataPoints.push(
    {
      x: stop.x,
      y:  stopPlot,
      lineDashType: "dash",
    });
  chart.options.data[5].dataPoints.push(
    {
      x: ohlc.length -8 < 0 ? ohlc[0].x : ohlc[ohlc.length - 8].x,
      y: stopPlot,
      indexLabel: 'stop',
      indexLabelFontColor: '#3cb4ff',
      lineDashType: "dash",
    });
  chart.options.data[5].dataPoints.push(
    {
      x: ohlc[ohlc.length-1].x,
      y:  stopPlot,
      lineDashType: "dash",
    });
  chart.options.data[5].dataPoints.push(
    {
      x: stop.x,
      y: null,
    });
}
  return arrow;
}

