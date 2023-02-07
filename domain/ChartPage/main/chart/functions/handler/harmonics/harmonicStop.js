import {returnMagnitude} from "./utilities";

export function addStopLoss(obj,array,axisXMaximum)
{
  if (obj.fractalStoploss !== undefined)
  {
    let status = obj.fractalStatus;
    let stopLoss = obj.fractalStoploss;
    let stopColor = "#730600";
    let maxX = status.active ? axisXMaximum : stopLoss.x2;
    let startTime = ((obj.dTime - obj.cTime) * 0.5) + obj.cTime;
    if (stopLoss.stopHit) {
      stopColor = "#fc666b";
    }
    array.push({
      x: startTime,
      y: stopLoss.y,
      lineColor: stopColor
    });
    array.push({
      x: maxX,
      y: stopLoss.y,
      indexLabel: "Stop - " + returnMagnitude(stopLoss.y),
      indexLabelFontColor: "white",
      lineColor: stopColor
    });
    array.push({
      x: stopLoss.x1,
      y: null
    });
  }
}
