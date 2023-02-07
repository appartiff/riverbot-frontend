export function plotNegative(chart, item,price = null)
{
  let plotPrice = price === null ? item.y : price;
  chart.options.data[5].dataPoints.push(
    {
      x: item.x,
      y: plotPrice,
      indexLabelFontColor: "#286cff",
      indexLabel: '⬇',
      indexLabelPlacement: "inside",
      indexLabelFontSize: 45,
    });
  chart.options.data[5].dataPoints.push(
    {
      x: item.x,
      y: null,
    });

}
