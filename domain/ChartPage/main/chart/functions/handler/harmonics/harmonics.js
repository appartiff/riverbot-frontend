import {addLegs} from "./harmonicsLegs";
import{addProjections} from "./Projections.js";
import{addStopLoss} from "./harmonicStop";
import{addPriceTargets} from "./harmonicTargets";

export function ProcessHarmonic(obj, chart,array,axisXMaximum)
{

  addLegs(obj, array);
  addStopLoss(obj,array,axisXMaximum);
  addProjections(obj,array,axisXMaximum);
  addPriceTargets(obj,array,axisXMaximum);
}


