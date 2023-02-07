export function plotElementIncontrolColor(chart,plot,trend)
{
  let lineColor ="#909090";
  if(trend.name === 'bias')
    lineColor = "#3cb4ff";
  if(trend.name === 'time')
    lineColor = "#effb80";
  if(trend.name ==='price')
    lineColor = "#af6af5";
  for (let i = trend.index; i < plot.length; i++)
  {
    chart.options.data[1].dataPoints[i].lineColor = lineColor;
  }
}
