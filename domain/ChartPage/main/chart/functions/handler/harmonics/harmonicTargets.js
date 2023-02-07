import{returnMagnitude} from "./utilities";

export function addPriceTargets(obj,array,axisXMaximum) {
  //price target
  let status = obj.fractalStatus;
  let targetList = obj.fractalTarget;
  if (targetList !== undefined) {
    for (let i = 0, len = targetList.length; i < len; i++)
    {
      let item = targetList[i];
      let maxX = status.active ? axisXMaximum : item.x2;
      if (item.enabled) {
        let target = i + 1;
        let targetColor = "#6670fc";
        if (item.targetReached) {
          targetColor = "#8ce389";
        }
        array.push({
          x: obj.dTime,
          y: item.y,
          lineColor: targetColor
        });
        array.push({
          x: maxX,
          y: item.y,
          indexLabel: "Target " + target + " - " + returnMagnitude(item.y),
          indexLabelFontColor: "white",
          lineColor: targetColor
        });
        array.push({
          x: item.x1,
          y: null
        });
      }
    }

  }
}
