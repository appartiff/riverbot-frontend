import axisY from "./optionsAxisY";

export function getPrimaryOptions(background)
{
  return {
    animationEnabled: true,
    backgroundColor: background,
    zoomEnabled: true,
    zoomType: "xy",
    exportEnabled: false,
    title:{
      text: '',
      fontColor: "#ffffff",
      fontSize: 16,
      fontFamily: 'Montserrat',
      horizontalAlign: "left"
    },
    axisX: {
      logarithmic: false, //change it to true
      labelFontColor: "#A6B8CE",
      labelFontSize: 14,
      gridColor: "#222441",
      lineColor: "#222441",

      crosshair: {
        enabled: true,
        snapToDataPoint: true,
        color:'#fff',
        lineDashType: "dot",
        thickness: 1,
        labelBackgroundColor: "#4c525e"
      }
    },
    ...axisY,
    AxisY:
      {
        title: "",
        tickLength: 0,
        lineThickness: 0,
        margin: 0,
        valueFormatString: " ", //comment this to show numeric values

      },
    toolTip: {
      shared: true,
      content: "Open <span style='\"'color: #89e3dd;'\"'>{y[0]}</span>, High <span style='\"'color: #89e3dd;'\"'>{y[1]}</span>, Low <span style='\"'color: #89e3dd;'\"'>{y[2]}</span>, Close <span style='\"'color: #89e3dd;'\"'>{y[3]}</span> ",
      fontColor: '#fff',
      fontSize:12,
    },
    data: [
      {
        type: "ohlc",
        xValueType: "dateTime",
        indexLabelFontSize: 18,
        color: 'white',
        axisYType: "secondary",
        risingColor: "#26a69a",
        fallingColor: "#ef5350",
        dataPoints: [] // Y: [Open, High ,Low, Close]
      },
      {//maximum X  //minimumX
        indexLabelPlacement: "auto",
        //Bullish

        type: "line",
        toolTipContent: null,
        markerType: "none",
        axisYType: "secondary",
        indexLabelFontSize: 22,
        lineThickness: 2,
        //axisYType: "secondary",
        color: "#fc8966",
        dataPoints: []
      },
      {//maximum X  //minimumX
        indexLabelPlacement: "auto",
        //Bullish
        type: "line",
        axisYType: "secondary",
        toolTipContent: null,
        markerType: "none",
        indexLabelFontSize: 18,
        lineThickness: 2,
        //axisYType: "secondary",
        color: "#9828ff",
        dataPoints: []
      },
      {
        type: "ohlc",
        xValueType: "dateTime",
        indexLabelFontSize: 16,
        color: '#fff',
        axisYType: "secondary",
        risingColor: "#26a69a",
        fallingColor: "#ef5350",
        dataPoints: [] // Y: [Open, High ,Low, Close]
      },
      //[4] Trendline
      {//maximum X  //minimumX
        indexLabelPlacement: "auto",
        type: "line",
        toolTipContent: null,
        markerType: "none",
        axisYType: "secondary",
        indexLabelFontSize: 16,
        lineThickness: 1,
        //axisYType: "secondary",
        color: "#fc8966",
        dataPoints: []
      },
      {//bias
        indexLabelPlacement: "auto",
        //Bullish
        type: "line",
        toolTipContent: null,
        markerType: "none",
        axisYType: "secondary",
        lineThickness: 2,
        //axisYType: "secondary",
        color: "#286cff",
        indexLabelFontColor: "#286cff",
        indexLabelFontSize: 20,
        dataPoints: []
      },
      {//bias
        indexLabelPlacement: "auto",
        //Bullish
        type: "scatter",
        toolTipContent: null,
        axisYType: "secondary",
        //axisYType: "secondary",
        fillOpacity: .3,
        color: "#286cff",
        markerSize: 20,
        dataPoints: []
      },
      {//time
        indexLabelPlacement: "auto",
        //Bullish
        type: "scatter",
        toolTipContent: null,
        axisYType: "secondary",
        //axisYType: "secondary",
        color: "#286cff",
        markerSize: 20,
        dataPoints: []
      },
      {//price
        indexLabelPlacement: "auto",
        //Bullish
        type: "scatter",
        axisYType: "secondary",
        toolTipContent: null,
        //axisYType: "secondary",
        color: "#286cff",
        markerSize: 20,
        dataPoints: []
      },
      {//visuals
        indexLabelPlacement: "auto",
        //Bullish
        type: "line",
        toolTipContent: null,
        markerType: "none",
        axisYType: "secondary",
        lineThickness: 2,
        //axisYType: "secondary",
        color: "#286cff",
        indexLabelFontColor: "#286cff",
        indexLabelFontSize: 20,
        dataPoints: []
      },
    ],
  }
}
export function getIndicatorOptions (background)
{
  return {
    animationEnabled: true,
    backgroundColor: background,
    title: {
      text: "",
      dockInsidePlotArea: true,
      fontColor: "#ffffff",
      fontSize: 12,
      fontFamily: 'Montserrat',
      horizontalAlign: "left"
    },
    axisX: {
      title: "",
      tickLength: 0,
      lineThickness: 0,
      margin: 0,
      valueFormatString: " ", //comment this to show numeric values
    },
    axisY2:
      {
        gridColor: "#222441",
        lineColor: "#222441",
        valueFormatString: "0000.0000####",
        labelMaxWidth: 55,   //change the width
        labelFontColor: "#c5c6c8",
        labelFontSize: 12,
        titleFontColor: "#303545",
        labelAutoFit: true, // change to false
      },
    data: [
      {
        type: "column",
        toolTipContent: null,
        dataPoints: [],
        xValueType: "dateTime",
        axisYType: "secondary",
        indexLabelFontSize: 18,
        color: 'white',
      }],
  }
}
