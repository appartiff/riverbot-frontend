export function plotLabels(chart,plot)
{
  let bullishOrBearish = null;
  let count = 0;
  for (let i = 0; i < plot.length - 1; i++)
  {
    let label = null;
    let nextItem = plot[i + 1];
    let item = plot[i];
    if (nextItem.high !== bullishOrBearish)
    {
      bullishOrBearish = nextItem.high;
      label = count;
      item.count  =  count;
      count = 0;
      chart.options.data[1].dataPoints[i].indexLabel = label.toString();
    }
    count++;
  }
}
