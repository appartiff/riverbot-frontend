


export function getTrendlineLegsFromHigherToLowerResolution(plot,legs)
{
  let newLegs =
    {
    leg1:[],
    leg2:[],
    leg3:[],
    leg4:[]
  };
  for (let i = plot.length - 1; i >= 0; i--)
  {
    let item = plot[i];
   if(getHigh(item,legs.leg1))
     newLegs.leg1.push(item);
    if(getHigh(item,legs.leg2))
      newLegs.leg2.push(item);
    if(getHigh(item,legs.leg3))
      newLegs.leg3.push(item);
    if(getHigh(item,legs.leg4))
      newLegs.leg4.push(item);
  }
  legs.leg1 = getHighestValue(legs.leg1,newLegs.leg1);
  legs.leg2 = getHighestValue(legs.leg2,newLegs.leg2);
  legs.leg3= getHighestValue(legs.leg3,newLegs.leg3);
  legs.leg4 = getHighestValue(legs.leg4,newLegs.leg4);
}
function getHighestValue(leg,items)
{
  if(leg === null)
    return null;
  let high = leg.plot.high;
  let highest = items[0];
  for (let i = 0; i < items.length; i++)
  {
    let item = items[i];
    if(high)
    {
      if(item.y > highest.y)
        highest = item;
    }
    else
      {
      if(item.y < highest.y)
        highest = item;
    }
  }
  return highest;
}
function getHigh(item,leg)
{
  if(leg === null)
    return false;
  let current = leg.plot;
  let next = leg.next;
  return item.x >= current.x && item.x < next.x;
}
