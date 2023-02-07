export function PlotObj(high, x, y, ohlc, lineColor) {
  this.high = high;
  this.x = x;
  this.y = y;
  this.ohlc = ohlc;
  this.lineColor = lineColor;
  this.isHigh = function () {
    return this.high === true;
  };
  this.isLow = function () {
    return this.high === false;
  }
}
