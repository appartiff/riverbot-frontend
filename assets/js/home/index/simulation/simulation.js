
import * as CanvasJS from "./canvasjs.min.js";
export const chart = new CanvasJS.Chart("chart",
  {
    zoomEnabled: true,
    zoomType: "xy",
    backgroundColor: "#1c1d27",
    animationEnabled: true,
    //theme: "dark2", // "light1", "light2", "dark1", "dark2"
    axisX:
      {
        logarithmic: false, //change it to true
        labelFontColor: "#A6B8CE",
        labelFontSize: 16
      },
    axisY2:
      {
        prefix: "$",
        gridColor: "#222441",
        lineColor: "#222441",
        logarithmic: true, //change it to false
        labelFontColor: "#c5c6c8",
        labelFontSize: 16,
        titleFontColor: "#303545",
        labelAutoFit: true

      },
    legend: {
      cursor: "pointer",
      verticalAlign: "top",
      horizontalAlign: "center",
      dockInsidePlotArea: true,
      itemclick: toogleDataSeries,
      fontSize: 15,
      fontColor: '#fff'
    },
    data: [
      {
        xValueType: "dateTime",
        showInLegend: true,
        color: '#66fcf1',
        type: "spline",
        axisYType: "secondary",
        name: "Portfolio",

        markerSize: 0,
        yValueFormatString: "$#,###k",
        dataPoints: [
        ]
      },
      {
        showInLegend: true,
        type: "stepLine",
        axisYType: "secondary",
        name: "50% of highest portfolio price ",

        markerSize: 0,
        yValueFormatString: "$#,###k",
        dataPoints: [
        ]
      }
    ]
  });
function toogleDataSeries(e) {
  e.dataSeries.visible = !(typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible);
}



export const indexGlobals =
  {
    simulation:
      {
        capital: [1000, 5000, 10000, 100000]
      },
    simulationSelected:
      {
      }
  };

export const simulationInstance = (function () {
  let capital = 1000;
  let trades = [];
  let amount = 100;
  //private Functions
  function privatefunction(pattern, amount) {
    let dataJSON =
      {
        pattern: pattern,
        amount: amount
      };
    $.ajax({
      url: "/api/simulation/",
      type: "POST",
      contentType: 'application/json',
      data: JSON.stringify(dataJSON),
      error: function () {

      },
      success: function (data) {

        try {
          trade(data);
        } catch (e) {

        }

      }
    });
  }
  function calculateRR(entry, target, stoploss) {
    //bearish
    if (entry > 0 && target > 0 && stoploss > 0) {
      //bearish
      if (entry > target) {

        var risk = (stoploss * 1.0021) - (entry * 0.999);
        var profit = entry - (target * 1.001);
        var RR = profit / risk;
        return RR.toFixed(2);
      }
      //bullish
      else
      {

        var risk = entry - (stoploss * 0.9979);
        var profit = (target * 0.999) - (entry * 1.001);
        var RR = profit / risk;
        return RR.toFixed(2);
      }
    } else {
      return 0;
    }
  }
  function clearChart() {
    for (let i = 0; i < chart.options.data.length; i++) {
      chart.options.data[i].dataPoints = [];
    }
  }
  function trade(trades) {
    //exit function if there is nothing to analyze

    let money = capital;
    clearChart();

    let stop = money * 0.5;
    let viewportMinimum = stop * 0.4;
    chart.options.axisY2.viewportMinimum = viewportMinimum;

    let highestPrice = 0;
    for (let i = 0; i < trades.length; i++) {

      let obj = trades[i];

      //bullish
      let RR = calculateRR(obj.entry, obj.target1, obj.stopLoss);

      if (RR > 1.2) {

        //1% of portfolio
        let risk = money * 0.01;
        //1% * reward
        let reward = (money * 0.01) * RR;
        if (obj.success === true) {

          money = money + reward;
        }
        else if(obj.failed === true){
          money = money - risk;
        }
        if (money > highestPrice) {
          highestPrice = money;

        }

        chart.options.data[1].dataPoints.push(
          {
            x: obj.x,
            y: highestPrice * 0.5
          });

        chart.options.data[0].dataPoints.push(
          {
            x: obj.x,
            y: money

          });
      }

    }
    chart.options.data[1].dataPoints.push(
      {
        x: trades[0].x,
        y: null
      });

    let increase = money - capital;
    let gains = ((increase / capital) * 100).toFixed(2);
    $('#profitPercentage').text(gains + '%');
    $('#profitSum').text(increase.toFixed(2) + ' $');

    chart.render();
  }
  //private Functions ends here
  return { // public interface
    fetchTrades: function (patternInput = "All Patterns", amountInput = 100, capitalInput = 1000) {
      // capital = capitalInput;
      // privatefunction(patternInput, amountInput);
    }
  };
})();



