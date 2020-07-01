
const globalArr = {};
globalArr.data = {};
globalArr.ohlcdata = [];
globalArr.dataplot = [];

globalArr.ProjectionLine = [];
globalArr.trendlines = [];
globalArr.stoploss = [];
globalArr.priceTarget = [];
globalArr.assetname = {};

const chart = new CanvasJS.Chart("chartContainer",
    {
        animationEnabled: true,
        //theme: "dark2", // "light1", "light2", "dark1", "dark2"
        backgroundColor: "#1c1d27",
        zoomEnabled: true,
        zoomType: "xy",
        exportEnabled: true,
        title: {
            text: globalArr.assetname,
            fontColor: "#ffffff",
            fontSize: 30,
            fontFamily: 'Montserrat',
            horizontalAlign: "center"
        },

        axisX: {
            logarithmic: false, //change it to true
            labelFontColor: "#A6B8CE",
            labelFontSize: 16
        },
        axisY: {
            includeZero: false,
            logarithmic: true, //change it to false
            gridColor: "#222441",
            lineColor: "#222441",
            labelFontColor: "#c5c6c8",
            labelFontSize: 14,
            titleFontColor: "#303545",
            labelAutoFit: true // change to false
        },

        toolTip: {
            shared: true
        },
        data: [
            {
                type: "candlestick",
                xValueType: "dateTime",
                indexLabelFontSize: 14,
                //risingColor: "#6ba583",
                //fallingColor: "#d75442",
                dataPoints: globalArr.data // Y: [Open, High ,Low, Close]

            },
            {
                indexLabelPlacement: "auto",
                //Bullish
                type: "line",
                markerType: "none",
                indexLabelFontSize: 14,
                lineThickness: 2,
                //axisYType: "secondary",
                color: "#fc8966",

                dataPoints: globalArr.dataplot
            },
            {
                type: "line",
                markerType: "none",
                lineDashType: "shortDot",
                lineThickness: 1,
                indexLabelFontSize: 14,
                color: "#fff",
                name: "Trendline",
                dataPoints: globalArr.trendlines
            },
            {
                type: "line",
                markerType: "none",
                name: "stoploss",
                fontFamily: 'Montserrat',
                indexLabelFontSize: 14,
                color: "#f93636",
                lineThickness: 1,
                dataPoints: globalArr.stoploss
            },
            {
                type: "line",
                markerType: "none",
                name: "priceTarget",
                lineThickness: 1,
                indexLabelFontSize: 14,
                color: "rgba(63, 191, 63, 0.52)",

                dataPoints: globalArr.priceTarget
            },
            {
                type: "line",
                markerType: "none",
                lineThickness: 1,
                indexLabelFontSize: 13,
                color: "#fff",

                dataPoints: globalArr.ProjectionLine
            }
        ]
    });


function UpdateChart(json) {
    for (var i = 0; i < json.length; i++) {
        var obj = json[i];
        chart.options.data[0].dataPoints.push({

            x: obj.x,
            y: obj.y
        });
        //chart.options.axisX.minimum += json.length;
        //chart.options.axisX.maximum += json.length;
        //chart.options.axisX.viewportMaximum += json.length;
        //chart.options.axisX.viewportMinimum += json.length;
    }
    chart.render();
}

function getMinMaxdataPoints(ohlcInput, patterns) {
    var highestDataPoint = Math.max.apply(Math, ohlcInput.map(function (o) { return o.y[1]; }));
    var lowestDataPoint = Math.min.apply(Math, ohlcInput.map(function (o) { return o.y[2]; }));
    for (var ii = 0; ii < patterns.length; ii++) {
        let targetList = patterns[ii].harmonicTarget;

        //loop through targets
        for (var i = 0, len = targetList.length; i < len; i++) {
            const item = targetList[i];
            if (item.y1 < lowestDataPoint && item.y1 > 0) {
                lowestDataPoint = item.y1;
            }
            if (item.y1 > highestDataPoint && item.y1 > 0) {
                lowestDataPoint = item.y1;
            }
        }
        //check stoplosses
        let stopLoss = patterns[ii].harmonicStoploss;
        if (stopLoss.y1 < lowestDataPoint && stopLoss.y1 > 0) {
            lowestDataPoint = stopLoss.y1;
        }
        if (stopLoss.y1 > highestDataPoint && stopLoss.y1 > 0) {
            highestDataPoint = stopLoss.y1;
        }
    }

    let heightLenght = highestDataPoint - lowestDataPoint;

    if ((lowestDataPoint - (heightLenght * 0.3)) > 0) {

    }
    else {
        chart.options.axisY.viewportMinimum = lowestDataPoint;
    }

    chart.options.axisY.viewportMaximum = highestDataPoint + (heightLenght * 0.3);
}
function setminPort(amount) {
    var single = globalArr.ohlcdata[globalArr.ohlcdata.length - 1].x - globalArr.ohlcdata[globalArr.ohlcdata.length - 2].x;
    var initial = globalArr.ohlcdata[globalArr.ohlcdata.length - 1].x - (amount * single);
    var above = globalArr.ohlcdata[globalArr.ohlcdata.length - 1].x + (40 * single);
    //chart.options.axisX.viewportMinimum = initial;
    globalArr.dataplot.push({
        x: above,
        y: null
    });
}
Array.min = function (array) {
    return Math.min.apply(Math, array);
};

function FetchOHLC(datainput, asset, patterns) 
{
    globalArr.ohlcdata = datainput;
    chart.options.title.text = asset;
    globalArr.dataplot = [];
    globalArr.trendlines = [];
    globalArr.stoploss = [];
    globalArr.priceTarget = [];
    globalArr.ProjectionLine = [];
    chart.options.data[0].dataPoints = globalArr.ohlcdata;
    chart.options.data[1].dataPoints = globalArr.dataplot;
    chart.options.data[2].dataPoints = globalArr.trendlines;
    chart.options.data[3].dataPoints = globalArr.stoploss;
    chart.options.data[4].dataPoints = globalArr.priceTarget;
    chart.options.data[5].dataPoints = globalArr.ProjectionLine;

    setminPort(300);
    if (patterns.length > 0) {
       addDataPoints(patterns);
  
    }
    chart.render();

}
function addProjections(obj) {

    let przList = obj.harmonicProjectionBox;
    if (przList !== undefined) {

        for (let j = 0, len = przList.length; j < len; j++) {
            let item = przList[j];
            globalArr.ProjectionLine.push({
                x: item.x1,
                y: item.y
            });
            globalArr.ProjectionLine.push({
                x: item.x2,
                y: item.y,
                indexLabel: item.text,
                indexLabelFontColor: "white"
            });
            globalArr.ProjectionLine.push({
                x: item.x1,
                y: null
            });
        }
    }
}

function addPriceTargets(obj) 
{
    //price target
    let targetList = obj.harmonicTarget;
    if (targetList !== undefined) 
    {
        for (let i = 0, len = targetList.length; i < len; i++) {
            let item = targetList[i];
            if(item.enabled) 
            {
                let target = i + 1;
                let targetColor = "#6670fc";
                if (item.targetReached) 
                {
                    targetColor = "#8ce389";
                }
                globalArr.priceTarget.push({
                    x: item.x1,
                    y: item.y1,
                    lineColor: targetColor
                });
                globalArr.priceTarget.push({
                    x: item.x2,
                    y: item.y1,
                    indexLabel: "Target " + target + " - " + returnMagnitude(item.y1),
                    indexLabelFontColor: "white",
                    lineColor: targetColor
                });
                globalArr.priceTarget.push({
                    x: item.x1,
                    y: null
                });
            }
        }

    }
}

function addLegs(obj)
{
    function legsColor(obj)
    {
        if (obj.harmonicEntry.activated === false) 
        {
            if(obj.harmonicStatus.active === false)
            {
                return "#c5c6c8";
            }
            return "#fcae66";
        }
        else if(obj.harmonicStatus.failed)
        {
            return "#fc666b";
        }
        else if(obj.harmonicStatus.success)
        {
            return "#21deab";
        }
    }
    let legColor = legsColor(obj);
    globalArr.dataplot.push({
        x: obj.dTime,
        y: null
    });
    globalArr.dataplot.push({
        x: obj.xTime,
        y: obj.xPrice,
        lineColor: legColor,
        indexLabel: "X",
        indexLabelFontColor: "white"

    });
    globalArr.dataplot.push({
        x: obj.aTime,
        y: obj.aPrice,
        lineColor: legColor,
        indexLabel: "A",
        indexLabelFontColor: "white"
    });
    globalArr.dataplot.push({
        x: obj.bTime,
        y: obj.bPrice,
        lineColor: legColor,
        indexLabel: "B",
        indexLabelFontColor: "white",

    });
    globalArr.dataplot.push({
        x: obj.cTime,
        y: obj.cPrice,
        lineColor: legColor,
        indexLabel: "C",
        indexLabelFontColor: "white"
    });
    globalArr.dataplot.push({
        x: obj.dTime,
        y: obj.dPrice,
        indexLabel: obj.harmonicDetected.name,
        indexLabelFontColor: "white"
    });
    globalArr.trendlines.push({
        x: obj.xTime,
        y: null
    });
    globalArr.trendlines.push({
        x: obj.xTime,
        y: obj.xPrice
    });
    globalArr.trendlines.push({
        x: obj.dTime,
        y: obj.dPrice
    });
    globalArr.trendlines.push({
        x: obj.xTime,
        y: null
    });
    globalArr.trendlines.push({
        x: obj.xTime,
        y: obj.xPrice
    });
    globalArr.trendlines.push({
        x: obj.bTime,
        y: obj.bPrice
    });
    globalArr.trendlines.push({
        x: obj.dTime,
        y: obj.dPrice
    });
    globalArr.trendlines.push({
        x: obj.xTime,
        y: null
    });
    globalArr.trendlines.push({
        x: obj.aTime,
        y: obj.aPrice
    });
    globalArr.trendlines.push({
        x: obj.cTime,
        y: obj.cPrice
    });

    globalArr.trendlines.push({
        x: obj.xTime,
        y: null
    });
    globalArr.dataplot.push({
        x: obj.dTime,
        y: null
    });
}
function addStopLoss(obj)
{
    if (obj.harmonicStoploss !== undefined)
    {
        let stopLoss = obj.harmonicStoploss;
        let stopColor = "#6670fc";
        if (stopLoss.stopHit) {
            stopColor = "#fc666b";
        }

        globalArr.stoploss.push({
            x: stopLoss.x1,
            y: stopLoss.y1,
            lineColor: stopColor
        });
        globalArr.stoploss.push({
            x: stopLoss.x2,
            y: stopLoss.y1,
            indexLabel: "Stop - " + returnMagnitude(stopLoss.y1),
            indexLabelFontColor: "white",
            lineColor: stopColor
        });
        globalArr.stoploss.push({
            x: stopLoss.x1,
            y: null
        });
    }
}

function addDataPoints(json) 
{
    for (let i = 0; i < json.length; i++) 
    {
        let obj = json[i];
        addLegs(obj);
        addStopLoss(obj);
        addProjections(obj);
        addPriceTargets(obj);
    }

}
