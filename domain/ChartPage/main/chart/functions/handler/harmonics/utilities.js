export function returnMagnitude(x)
{
  if (x == null){
    return null;
  }
  let m = -Math.floor(Math.log(x) / Math.log(10) + 1);
  if (m < 0 || m >= 100) {
    return x;
  }
  else {
    return x.toFixed(3 + m);
  }
}
