export function setNewStopLow(plot, current,circle)
{
  let lowestPrice = plot[current];
  for (let i = current; i >= circle.index; i--)
  {
    let item = plot[i];
    if(item.y < lowestPrice.y)
    {
      return false;
    }
  }
  return true;
}
