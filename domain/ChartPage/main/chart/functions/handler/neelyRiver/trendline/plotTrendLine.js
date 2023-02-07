function getSlope(a, b) {

  if(a ===null || b === null ||a === undefined || b === undefined )
    return null;
  let deltaX = b.x - a.x;
  let deltaY = Math.log(b.y) - Math.log(a.y);
  return deltaY / deltaX;
}

function plotTrendline(intercept, ohlc, chart, deltaX, slope, color) {
  let start = 0;
  let extraLength = ohlc[ohlc.length - 1].x + ((ohlc[ohlc.length - 1].x - ohlc[ohlc.length - 2].x) * (ohlc.length * 1.2));

  for (let i = intercept.x; i < extraLength; i += deltaX) {
    let y = intercept.y * Math.exp(slope * (start * deltaX));
    if (y > 0) {
      chart.options.data[4].dataPoints.push(
        {
          x: i,
          y: y,
          lineColor: color,
          indexLabelFontSize: 25,
        });
    } else {
      break;
    }
    start++;
  }
  chart.options.data[4].dataPoints.push(
    {
      x: intercept.x,
      y: null,
      lineColor: color,
      indexLabelFontSize: 25,
    });
}

//1-3 2-4
export function plotTimeTrendline(chart, ohlc, legs, color)
{
  if (isNullOrUndefined(legs.leg1)|| isNullOrUndefined(legs.leg2)|| isNullOrUndefined(legs.leg3) || isNullOrUndefined(legs.leg4))
    return null;
  let leg13Slope = getSlope(legs.leg3, legs.leg1);
  if(leg13Slope ===null)
    return;
  let leg13DeltaX = legs.leg1.x - legs.leg3.x;
  let leg24Slope = getSlope(legs.leg2, legs.leg4);
  if(leg24Slope ===null)
    return;
  let leg24DeltaX = legs.leg2.x - legs.leg4.x;
  plotTrendline(legs.leg3, ohlc, chart, leg13DeltaX, leg13Slope, color);
  plotTrendline(legs.leg4, ohlc, chart, leg24DeltaX, leg24Slope, color);
}

function isNullOrUndefined (item)
{
  return (item === null || item === undefined)
}

//1-3 parallell channel
export function plotPriceTrendline(chart, ohlc, legs, color, channel)
{

  if (isNullOrUndefined(legs.leg1) || isNullOrUndefined(legs.leg2)||isNullOrUndefined(legs.leg3))
    return null;
  let leg13Slope = getSlope(legs.leg3, legs.leg1);
  if(leg13Slope ===null)
    return;
  let leg13DeltaX = legs.leg1.x - legs.leg3.x;
  plotTrendline(legs.leg3, ohlc, chart, leg13DeltaX, leg13Slope, color);
  plotTrendline(legs.leg2, ohlc, chart, leg13DeltaX, leg13Slope, color);
}

//1-2 horizontal channel
export function plotBiasTrendline(chart, ohlc, legs, color)
{
  if (isNullOrUndefined(legs.leg1) || isNullOrUndefined(legs.leg2))
    return null;
  let leg12DeltaX = legs.leg1.x - legs.leg2.x;
  plotTrendline(legs.leg1, ohlc, chart, leg12DeltaX, 0, color);
  plotTrendline(legs.leg2, ohlc, chart, leg12DeltaX, 0, color);
}
