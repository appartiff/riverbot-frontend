export default {
  axisY2: {
    includeZero: false,
    logarithmic: true,
    logarithmBase: 2.718,
    gridColor: "#222441",
    lineColor: "#222441",
    labelFontColor: "#c5c6c8",
    labelFontSize: 12,
    valueFormatString:  "0000.0000####",
    labelMaxWidth: 55,   //change the width
    titleFontColor: "#303545",
    labelAutoFit: true, // change to false
    margin: 5,
    crosshair: {
      enabled: true,
      snapToDataPoint: false,
      labelWrap: true,
      labelMaxWidth: 55,   //change the width
      valueFormatString:  "####.0000####",
      labelFontSize: 12,
      color:'#fff',
      lineDashType: "dot",
      thickness: 1,
      labelBackgroundColor: "#4c525e"
    },
    stripLines: [
      {
        value: null,
        thickness: 1,
        lineDashType: 'dot',
        color: '#fff',
        labelFontColor: "#89e3dd"
      }
    ]
  }
}
