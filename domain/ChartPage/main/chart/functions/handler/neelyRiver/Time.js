import {Arrow} from "./objects/arrow";

export function ProcessTime(plot, chart, ohlc)
{
  function GetPreviousHigh(plot, current)
  {
    for (let i = current - 1; i >= 1; i--)
    {
      let item = plot[i];
      let prev = plot[i - 1];
      let next = plot[i + 1];
      if (item.high && item.y > prev.y && item.y > next.y)
      {
        return plot[i];
      }
    }
    return [plot[0]]
  }

  function GetPreviousLow(plot, current)
  {
    for (let i = current - 1; i >= 1; i--) {
      let prev = plot[i - 1];
      let next = plot[i + 1];
      let item = plot[i];
      if (item.high === false && item.y < prev.y && item.y < next.y) {
        return plot[i];
      }
    }
    return plot[0]
  }

  let positiveOrNegative = "";
  let positive = 0;
  let negative = 0;
  let previous = "";
  let prevPositive = 0;
  let prevNegative = 0;
  let prevNeutral = 0;
  let stop = plot[null];
  let start = 0;
  let arrow = null;
  let arrowColor = null;
  function getHeightOfBar(item)
  {

  }
  function isPreviousBarNegative()
  {
    return previous ==='-';
  }

  function isPreviousBarPositive()
  {
    return previous ==='+';
  }

  function isNextLowAndPositive(next)
  {
    return next !== null && next.high === false && positiveOrNegative === '+';
  }
  function isNextHighAndNegative(next)
  {
    return next !== null &&  next.high === true && positiveOrNegative === '-';
  }
  for (let i = 1; i < plot.length; i++)
  {
    let item = plot[i];
    let next = i+1 < plot.length ? plot[i+1] : null;
    if(i ===1)
    {
      if(item.high === false)
      {
        positiveOrNegative = "-";
        arrow = new Arrow('-',item,'time',0,i);
        // chart.options.data[1].dataPoints[i].indexLabel = '(-)';
        // chart.options.data[1].dataPoints[i].indexLabelFontColor = '#effb80';
      }
      if(item.high)
      {
        positiveOrNegative = "+";
        arrow = new Arrow('+',item,'time',0,i);
        // chart.options.data[1].dataPoints[i].indexLabel = '(+)';
        // chart.options.data[1].dataPoints[i].indexLabelFontColor = '#effb80';
      }
      arrowColor = '#effb80';
    }

    if (item.isHigh())
    {
      positive++;
      if (isPreviousBarNegative())
      {
        prevNegative = negative;
        positive = 1;
      }
      if (prevNegative === prevPositive && positiveOrNegative === '+')
      {
        stop = GetPreviousLow(plot, i);
      }
      if(negative >= positive && positiveOrNegative === '-' && item.y > stop.y)
      {
        positiveOrNegative = "x";
        arrow = new Arrow('x',item,'time',0,i);
        if (next !== null && next.isLow())
         {
          chart.options.data[1].dataPoints[i].indexLabel = positive.toString();
        }
        // else
        // {
        //   chart.options.data[1].dataPoints[i].indexLabel = '(x)';
        // }
        // chart.options.data[1].dataPoints[i].indexLabelFontColor = '#effb80';
        stop = null;
      }
      if (positiveOrNegative  === '+')
      {
        chart.options.data[1].dataPoints[i].indexLabelFontColor = '#6af56a';
      }
      //time turned positive
      if (positive > negative && positiveOrNegative !== '+')
      {
        stop = GetPreviousLow(plot, i);
        positiveOrNegative = "+";
        arrow = new Arrow('+',item,'time',0,i);
        start = i;
       if (next !== null && next.high === false) {
         chart.options.data[1].dataPoints[i].indexLabel = positive.toString();
       }
        arrowColor ='#effb80';
        chart.options.data[1].dataPoints[i].indexLabelFontColor = '#effb80';
        chart.options.data[1].dataPoints[i].indexLabelFontSize = 25;
      }
        previous = '+';
    }
    if (item.isLow())
    {
      negative++;
      if (isPreviousBarPositive())
      {
        prevPositive = positive;
        negative = 1;
      }

        if (prevNegative === prevPositive&& positiveOrNegative === '-' )
        {
          stop = GetPreviousHigh(plot, i);
        }
        //time is positive, but negative is less than positive and stoploss hit
        if(negative <= positive && positiveOrNegative === '+' && item.y < stop.y)
        {
          positiveOrNegative = "x";
          arrow = new Arrow('x',item,'time',0,i);
           if (next !== null && next.isHigh())
          {
            chart.options.data[1].dataPoints[i].indexLabel = negative.toString();
         }
          // else
          // {
          //   chart.options.data[1].dataPoints[i].indexLabel = '(x)';
          // }
          chart.options.data[1].dataPoints[i].indexLabelFontColor = '#effb80';
          arrowColor ='#effb80';

          stop = null
        }

      if (positiveOrNegative  === '-')
      {
        chart.options.data[1].dataPoints[i].indexLabelFontColor = '#f56a6a';
      }
      //time turned negative
      if ((negative > positive && positiveOrNegative !== '-'))
      {
        stop = GetPreviousHigh(plot, i);
        if (next !== null && next.high === true)
        {
          chart.options.data[1].dataPoints[i].indexLabel = negative.toString();
       }
        chart.options.data[1].dataPoints[i].indexLabelFontColor = '#effb80';
        chart.options.data[1].dataPoints[i].indexLabelFontSize = 25;
        positiveOrNegative = "-";
        arrowColor ='#effb80';
        arrow = new Arrow('-',item,'time',0,i);
      }
      previous = '-';
    }
  }

  if(stop !== null && stop.ohlc !== undefined && positiveOrNegative !==  'x')
  {
    let stopPlot = positiveOrNegative === '+' ? stop.ohlc.y[2] : stop.ohlc.y[1];
    chart.options.data[2].dataPoints.push(
      {
        x: stop.x,
        y: stopPlot,
        lineDashType: "dash",
        lineColor: '#effb80',
      });
    chart.options.data[2].dataPoints.push(
      {
        x: ohlc[ohlc.length - 5].x,
        y:stopPlot,
        indexLabel: 'stop',
        lineColor: '#effb80',
        lineDashType: "dash",
        indexLabelFontColor: '#effb80'
      });
    chart.options.data[2].dataPoints.push(
      {
        x: ohlc[ohlc.length-1].x,
        lineDashType: "dash",
        y:stopPlot,
      });
    chart.options.data[2].dataPoints.push(
      {
        x: stop.x,
        y: null,
      });
  }
  if(arrow !== null)
  {
    let arrowPlot = positiveOrNegative === '+' ? '⬆' : '⬇';

    if(positiveOrNegative === 'x')
      arrowPlot = '⬇';

    let labelSize = arrowPlot === '➤' ? 30 : 45;
    let labelOrientation = positiveOrNegative === 'x' ? "vertical" :"horizontal";
    chart.options.data[2].dataPoints.push(
      {
        x: arrow.plot.x,
        y:  arrow.plot.y,
        indexLabel : arrowPlot,
        indexLabelFontColor : arrowColor,
      indexLabelPlacement: "inside",
        indexLabelOrientation:labelOrientation,
        indexLabelFontSize :labelSize,
      });
    chart.options.data[2].dataPoints.push(
      {
        x: arrow.plot.x,
        y: null,
      });
  }
  return arrow;
}
