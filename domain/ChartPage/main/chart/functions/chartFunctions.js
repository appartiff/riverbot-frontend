export function cleanupPatterns(chartList)
{

  for (let i = 0; i < chartList.length; i++)
  {
    let chart = chartList[i];
    let dataSeries;
    for (let i = 0; i < chart.options.data.length; i++) {

      if (i === 0 || i === 3) {
        continue;
      }
      chart.options.data[i].dataPoints = [];
    }
  }
}
export function setChartType(chart,indexArray = [],type)
{
  let dataSeries;
  for(let i = 0; i < indexArray.length; i++) {
    dataSeries = chart.options.data[indexArray[i]];
    if (type === 'Candle') {
      dataSeries.type = 'candlestick';
    }
    if (type === 'Bar') {
      dataSeries.type = 'ohlc';
    }
  }
}
export function syncHandler (e,charts)
{
  for (var i = 0; i < charts.length; i++) {
    var chart = charts[i];

    if (!chart.options.axisX)
      chart.options.axisX = {};

    if (!chart.options.axisY2)
      chart.options.axisY2 = {};

    if (e.trigger === "reset") {
      chart.options.axisX.viewportMinimum = chart.options.axisX.viewportMaximum = null;
      chart.options.axisY2.viewportMinimum = chart.options.axisY2.viewportMaximum = null;
      chart.render();

    } else if (chart !== e.chart)
    {
      chart.options.axisX.viewportMinimum = e.axisX[0].viewportMinimum;
      chart.options.axisX.viewportMaximum = e.axisX[0].viewportMaximum;
      chart.render();
    }
  }
}
export function changeBorderColor(chart,indexArray = [],selectedChartType)
{
  let color = null;
  if(selectedChartType ==='Bar')
  {
    color = 'white';
  }
    let dataSeries;
    for(let i = 0; i < indexArray.length; i++)
    {
      dataSeries = chart.options.data[indexArray[i]];

      if(selectedChartType === 'column')
      {
        for (let j = 0; j < dataSeries.dataPoints.length; j++) {
          if (dataSeries.dataPoints[j].y !== null)
          {
            if(j !== 0)
              dataSeries.dataPoints[j].color = (dataSeries.dataPoints[j-1].y <= dataSeries.dataPoints[j].y) ? 'green':'red';
            else
              dataSeries.dataPoints[j].color = (dataSeries.dataPoints[j+1].y >= dataSeries.dataPoints[j].y) ? 'green':'red';
          }
        }
      }
      else
      {

        for (let j = 0; j < dataSeries.dataPoints.length; j++) {
          if (dataSeries.dataPoints[j].y !== null) {
            if (color === null) {
              dataSeries.dataPoints[j].color = (dataSeries.dataPoints[j].y[0] <= dataSeries.dataPoints[j].y[3]) ? (dataSeries.risingColor ? dataSeries.risingColor : dataSeries.color) : (dataSeries.fallingColor ? dataSeries.fallingColor : dataSeries.color);
            } else {
              dataSeries.dataPoints[j].color = color;
            }
          }
        }
      }
  }
}
