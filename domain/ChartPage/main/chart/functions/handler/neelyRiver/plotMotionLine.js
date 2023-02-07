export function MotionLine (chart,plot)
{
  if(plot.length < 2)
    return;
  for (let i = 0; i < plot.length; i++)
  {
    let item = plot[i];
    if(i === 0)
    {
      chart.options.data[9].dataPoints.push(
        {
          x: plot[0].x,
          y: item.y,
          indexLabelFontSize:20,
          lineColor:"#33fff1"
        });
      chart.options.data[9].dataPoints.push(
        {
          x: plot[i+1].x,
          y: item.y,
          indexLabelFontSize:20,
          lineColor:"#33fff1"
        });
      chart.options.data[9].dataPoints.push(
        {
          x: plot[i+1].x,
          y: null,
        });
    }
    chart.options.data[1].dataPoints.push(
      {
        x: item.x,
        y: item.y,
        lineColor: item.lineColor,
        indexLabelFontColor: "#d9d9d9",
      });


  }

}
