import {Arrow} from "./objects/arrow";

export function ProcessPrice(plot, chart,ohlc) {

  function GetPreviousHigh(plot, current,stop  = null)
  {
    for (let i = current - 1; i >= 1; i--)
    {
      let item = plot[i];
      let prev = plot[i - 1];
      let next  = plot[i+1];
      if(stop !== null &&item.y < stop)
      {
        break;
      }
      if (item.high && item.y > prev.y&& item.y > next.y)
      {
        return plot[i];
      }
    }
    return [plot[0]]
  }

  function GetPreviousLow(plot, current,stop = null)
  {
    for (let i = current - 1; i >= 1; i--)
    {
      let prev = plot[i - 1];
      let next  = plot[i+1];
      let item = plot[i];
      if(stop !== null && item.y > stop)
      {
        break;
      }
      if (item.high === false && item.y < prev.y && item.y < next.y)
      {
        return plot[i];
      }
    }
    return plot[0]
  }
  //Price
  let positiveOrNegative = "";
  let stop = plot[0];
  let positiveNegativePlot = null;
  let positiveNegativePrevious = null;
  let arrow = null;
  let arrowPrice = null;
  for (let i = 1; i < plot.length; i++)
  {
    let item = plot[i];
    if (item.high)
    {
      let previousHigh = GetPreviousHigh(plot, i);
      let previousLow = GetPreviousLow(plot, i);
      if(positiveOrNegative ==='+')
      {
        stop = previousLow;
      }
      if (positiveOrNegative !== '+' && item.y > previousHigh.y && previousHigh.x <= previousLow.x)
      {
        stop = previousLow;
        positiveOrNegative = '+';
        arrow = new Arrow('+',item,'price',2,i);
        arrowPrice = previousHigh.y;
        positiveNegativePlot = item;
        positiveNegativePrevious = previousHigh;
        // chart.options.data[2].dataPoints.push(
        //   {
        //     x: positiveNegativePlot.x,
        //     y: arrowPrice,
        //     indexLabel: '⬆',
        //     indexLabelFontSize: 45,
        //     indexLabelPlacement: "inside",
        //     indexLabelFontColor: '#af6af5',
        //
        //   });
        // chart.options.data[2].dataPoints.push(
        //   {
        //     x: positiveNegativePlot.x,
        //     y: null,
        //   });
      }
    }
    if (item.high === false)
    {
      let previousLow = GetPreviousLow(plot, i);
      let previousHigh = GetPreviousHigh(plot, i);
      if(positiveOrNegative ==='-')
      {
        stop = previousHigh;
      }
      if (positiveOrNegative !== '-' && item.y < previousLow.y && previousLow.x <= previousHigh.x)
      {
        stop = previousHigh;
        positiveOrNegative = '-';
        arrow = new Arrow('-',item,'price',2,i);
        arrowPrice = previousLow.y;
        positiveNegativePlot = item;
        positiveNegativePrevious = previousLow;
        // chart.options.data[2].dataPoints.push(
        // {
        //   x: positiveNegativePlot.x,
        //   y: arrowPrice,
        //   indexLabel: '⬇',
        //   indexLabelFontSize: 45,
        //   indexLabelPlacement: "inside",
        //   indexLabelFontColor: '#af6af5',
        //
        // });
        // chart.options.data[2].dataPoints.push(
        //   {
        //     x: positiveNegativePlot.x,
        //     y: null,
        //   });

      }
    }
  }
  let stopPlot = positiveOrNegative === '+' ? stop.ohlc.y[2] : stop.ohlc.y[1];
  let plotPositiveOrNegative = positiveOrNegative === '+' ? '⬆' : '⬇';
  if(positiveNegativePlot !== null)
  {
    chart.options.data[2].dataPoints.push(
      {
        x: positiveNegativePlot.x,
        y: arrowPrice,
        indexLabel: plotPositiveOrNegative,
        indexLabelFontSize: 45,
        indexLabelPlacement: "inside",
        indexLabelFontColor: '#af6af5',

      });
    chart.options.data[2].dataPoints.push(
      {
        x: positiveNegativePlot.x,
        y: null,
      });

    chart.options.data[2].dataPoints.push(
      {
        x: stop.x,
        y: stopPlot,
        lineDashType: "dash"
      });
    chart.options.data[2].dataPoints.push(
      {
        x: ohlc[ohlc.length - 1].x,
        y: stopPlot,
        indexLabel: 'stop',
        lineDashType: "dash",
        indexLabelFontColor: '#af6af5'
      });

    chart.options.data[2].dataPoints.push(
      {
        x: stop.x,
        y: null,
      });
  }
  return arrow;

}
