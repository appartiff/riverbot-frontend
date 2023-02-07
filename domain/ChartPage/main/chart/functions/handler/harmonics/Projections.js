export function addProjections(obj,array,axisXMaximum)
{


  let przList = obj.fractalProjectionBox;
  let status = obj.fractalStatus;
  let startTime = ((obj.dTime - obj.cTime) * 0.5) + obj.cTime;
  if (przList !== undefined)
  {
    for (let j = 0, len = przList.length; j < len; j++)
    {
      let item = przList[j];
      let maxX = status.active ? axisXMaximum : item.x2;
      array.push({
        x: startTime,
        lineColor: "white",
        y: item.y
      });
      array.push({
        x: maxX,
        y: item.y,
        indexLabel: item.text,
        indexLabelFontColor: "white"
      });
      array.push({
        x: item.x1,
        y: null
      });
    }
  }
}
