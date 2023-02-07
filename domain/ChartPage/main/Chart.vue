<template>
  <div id="chart-container">
    <div class="chart-horizontal">
      <apexChartTitle :trend-prop="trend1" :title-prop="chart1Title"></apexChartTitle>
      <div id="chart" class="chart"></div>
      <div id="chart-ao" class="chart-indicator"></div>
      <div id="chart-ac" class="chart-indicator"></div>
    </div>
    <div class="chart-horizontal">
      <apexChartTitle :trend-prop="trend2" :title-prop="chart2Title"></apexChartTitle>
      <div id="chart2" class="chart">
      </div>
    </div>
    <div class="chart-horizontal">
      <apexChartTitle :trend-prop="trend3" :title-prop="chart3Title"></apexChartTitle>
      <div id="chart3" class="chart">
      </div>
    </div>
  </div>
</template>
<script>
    import ChartTitle from './chart/overlay/ChartTitle';
    import {processRiver} from './chart/functions/handler/patternsHandler';
    import * as chartFunctions from "./chart/functions/chartFunctions";
    import {mapActions, mapMutations, mapState} from "vuex";
    import {AwesomeOscillator} from './chart/indicators/AO'
    import{Ac} from './chart/indicators/AC';
    import * as ChartOptions from "./chart/configuration/ChartOptions";

    export default {
        components:
            {
                'apexChartTitle': ChartTitle,
            },
        data() {
            return {
                charts: [CanvasJS.Chart,CanvasJS.Chart,CanvasJS.Chart],
                chartAo: null,
                chartAc:null,
                trends:null,
                routeParams:
                    {
                        exchange: this.$route.params.exchange,
                        asset: this.$route.params.asset,
                        timeframe: this.$route.params.timeframe,
                    }
            }
        },
        computed: {
            ...mapState('chartNavigation', ['selectedAsset', 'selectedExchange', 'selectedTimeframe', 'selectedAssetApi', 'selectedChartType']),
            ...mapState('chartPatterns', ['patternsConfig']),
            ...mapState('chart-candles', ['lastOhlc', 'ohlc', 'ohlcX5', 'ohlcX25', 'ohlcX125', 'chart1AxisXMaximum', 'chart2AxisXMaximum', 'chart3AxisXMaximum', 'displayedTimeframes']),
            ...mapState(['selectedSidebarIndex',]),
            river() {
                return this.patternsConfig['river'].enabled
            },
            chart1Title()
            {
                return this.selectedAsset + " - " + this.displayedTimeframes[0];
            },
            chart2Title()
            {
                return this.selectedAsset + " - " + this.displayedTimeframes[1];
            },
            chart3Title()
            {
                return this.selectedAsset + " - " + this.displayedTimeframes[2];
            },
            trend1()
            {
                return this.trends === null ? {trend: 0, sum:0}:  {trend: this.trends.chart1, sum:this.trends.sum};
            },
            trend2()
            {
                return this.trends === null ? {trend: 0, sum:0}:  {trend: this.trends.chart2, sum:this.trends.sum};
            },
            trend3()
            {
                return this.trends === null ? {trend: 0, sum:0}:  {trend: this.trends.chart3, sum:this.trends.sum};
            }
        },
        methods:
            {
                ...mapMutations('chart-candles', ['setmaxPort', 'connectSignalR', 'disconnectSignalr']),
                ...mapActions('chart-candles', ['loadCandles']),
                UpdatePatterns: function () {

                    chartFunctions.cleanupPatterns(this.charts);
                    this.RenderChart();
                    let asset = {
                        exchange: this.selectedExchange,
                        timeframe: this.selectedTimeframe,
                        asset: this.selectedAsset
                    };
                    this.trends = processRiver( this.charts[0],  this.charts[1],  this.charts[2], [this.ohlc, this.ohlcX5, this.ohlcX25, this.ohlcX125], this.patternsConfig, asset);
                    this.RenderChart();
                },
                UpdateChartTypeAndBordercolor: function ()
                {

                    for (let i = 0; i < this.charts.length; i++)
                    {
                        chartFunctions.setChartType(this.charts[i], [0, 3], this.selectedChartType);
                        chartFunctions.changeBorderColor(this.charts[i], [0, 3], this.selectedChartType);
                    }
                    chartFunctions.changeBorderColor(this.chartAo, [0], 'column');
                    chartFunctions.changeBorderColor(this.chartAc, [0], 'column');
                },
                RenderChart: function ()
                {
                    for (let i = 0; i < this.charts.length; i++)
                    {
                        this.charts[i].render();
                    }
                    this.chartAo.render();
                    this.chartAc.render();
                },

                axisXMaximum: function ()
                {
                    this.charts[0].options.axisX.maximum = this.chart1AxisXMaximum;
                    this.charts[1].options.axisX.maximum = this.chart2AxisXMaximum;
                    this.charts[2].options.axisX.maximum = this.chart3AxisXMaximum;
                    this.chartAo.options.axisX.maximum = this.chart1AxisXMaximum;
                    this.chartAc.options.axisX.maximum = this.chart1AxisXMaximum;
                },
                setChartTitles: function ()
                {
                    this.chartAo.options.title.text = "Awesome Oscillator (AO) - Log";
                    this.chartAc.options.title.text = "Awesome Oscillator (AC) - Log";
                },
                setOhlc: function () {
                    this.charts[0].options.data[0].dataPoints = this.ohlc;
                    this.charts[1].options.data[0].dataPoints = this.ohlcX5;
                    this.charts[2].options.data[0].dataPoints = this.ohlcX25;
                    let AO = AwesomeOscillator(this.ohlc);
                    let AC =Ac(AO,this.ohlc);
                    this.chartAc.options.data[0].dataPoints = AC;
                    this.chartAo.options.data[0].dataPoints = AO;
                    this.setChartTitles();
                },
                initializeChart:function()
                {
                    this.charts[0] = new CanvasJS.Chart("chart", ChartOptions.getPrimaryOptions("#131722"));
                    this.charts[0].options.rangeChanged = this.chart1SyncHandler;
                    this.charts[1] = new CanvasJS.Chart("chart2", ChartOptions.getPrimaryOptions("#1e232d"));
                    this.charts[2] = new CanvasJS.Chart("chart3", ChartOptions.getPrimaryOptions("#1e232d"));
                    this.chartAo = new CanvasJS.Chart("chart-ao", ChartOptions.getIndicatorOptions("#131722"));
                    this.chartAc = new CanvasJS.Chart("chart-ac", ChartOptions.getIndicatorOptions("#131722"));
                    this.setOhlc();
                    this.setChartTitles();
                    this.axisXMaximum();
                    this.RenderChart();
                },
                chart1SyncHandler: function (e)
                {
                    chartFunctions.syncHandler(e,[this.charts[0],this.chartAo,this.chartAc]);
                }
            },
        watch:
            {
                selectedSidebarIndex: function ()
                {
                    if (this.selectedSidebarIndex === 0)
                    {
                        this.RenderChart();
                    }
                },
                selectedChartType: function ()
                {
                    this.UpdateChartTypeAndBordercolor();
                    this.RenderChart();
                },
                ohlc: function ()
                {
                    this.setOhlc();
                    this.charts[0].options.data[3].datapoints = null;
                    this.UpdateChartTypeAndBordercolor();
                    this.axisXMaximum();
                    this.UpdatePatterns();
                },
                river: {
                    handler: "UpdatePatterns"
                },
                lastOhlc: function () {
                    let stripLine = this.chart.options.axisY.stripLines[0];
                    if (this.lastOhlc === null)
                    {
                        this.chart.options.data[3].dataPoints = [];
                        stripLine.value = null;
                        stripLine.label = null;
                    } else {
                        this.chart.options.data[3].dataPoints[0] = this.lastOhlc;
                        chartFunctions.changeBorderColor(this.chart, [3], this.selectedChartType);
                        let price = this.lastOhlc.y[3];
                        stripLine.value = price;
                        stripLine.label = price;
                    }
                    this.chart.render();

                }
            },
        mounted: function ()
        {
            this.initializeChart();
            this.connectSignalR();
        },
        beforeMount() {
            let payload =
                {
                    'exchange': this.routeParams.exchange,
                    'timeframe': this.routeParams.timeframe,
                    'asset': this.routeParams.asset,
                };
            this.loadCandles(payload);
        },
        beforeDestroy() {
            this.disconnectSignalr();
        }
    }


</script>

<style>
  .canvasjs-chart-tooltip {
    position: absolute !important;
    top: 100% !important;
    left: 35% !important;
    border: none !important;
    box-shadow: none !important;
  }

  .canvasjs-chart-tooltip div
  {
    background: transparent !important;
    display: inline-block !important;
    border: none !important;
  }

  #chart2, #chart3
  {
    height: 100%;
  }
  #chart2
  {
  }

  #chart {
    height: 80%;

  }

  #chart-container {
    height: 100%;
    width: 100%;
    display: flex;
  }

  .chart-horizontal {
    flex: 33.33%;
    border-right:1px solid rgb(51, 51, 51);
  }

  .chart-indicator {
    height: 10%;
  }

</style>
