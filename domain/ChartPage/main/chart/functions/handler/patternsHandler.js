import {ProcessHarmonic} from "./harmonics/harmonics"
import {MotionLine} from "./neelyRiver/plotMotionLine";
import {plotLabels} from "./neelyRiver/labels";
import {ProcessMotionLine} from "./neelyRiver/processMotionLine";
import {ProcessTime} from "./neelyRiver/Time";
import {ProcessPrice} from "./neelyRiver/Price";
import {ProcessBias} from "./neelyRiver/biasV2";
import {ProcessTrendline} from './neelyRiver/trendline/ProcessTrendline';

export function processRiver(chart, chart2, chart3, ohlc, config, asset) {
  if (config["river"].enabled === false)
    return;
  let plot = [];
  let plotX5 = [];
  let plotX25 = [];
  let plotX125 = [];
  if (ohlc.count === 0) {
    return;
  }
  ProcessMotionLine(plot, ohlc[0]);
  ProcessMotionLine(plotX5, ohlc[1]);
  ProcessMotionLine(plotX25, ohlc[2]);
  ProcessMotionLine(plotX125, ohlc[3]);
  MotionLine(chart, plot);
  plotLabels(chart, plot);
  MotionLine(chart2, plotX5);
  plotLabels(chart2, plotX5);
  MotionLine(chart3, plotX25);
  plotLabels(chart3, plotX25);
  let trends;
  if (plot.length > 0)
  {
   trends  = [ProcessBias(plot, chart, ohlc[0]), ProcessTime(plot, chart, ohlc[0]), ProcessPrice(plot, chart, ohlc[0])];
    if (plotX5.length > 0)
    {
      ProcessTrendline(plot, plotX5, chart, ohlc[0], trends, asset, config);
    }
  }
  let trends2;
  if (plotX5.length > 0) {
     trends2 = [ProcessBias(plotX5, chart2, ohlc[1]), ProcessTime(plotX5, chart2, ohlc[1]), ProcessPrice(plotX5, chart2, ohlc[1])];
    if (plotX25.length > 0) {
      ProcessTrendline(plotX5, plotX25, chart2, ohlc[1], trends2, asset, config);
    }
  }
  let trends3;
  if (plotX25.length > 0)
  {
    trends3 = [ProcessBias(plotX25, chart3, ohlc[2]), ProcessTime(plotX25, chart3, ohlc[2]), ProcessPrice(plotX25, chart3, ohlc[2])];
    if (plotX125.length > 0)
    {
      ProcessTrendline(plotX25, plotX125, chart3, ohlc[2], trends3, asset, config);
    }
  }
  let trends1Count  = getTrendsCount(trends);
  let trends2Count = getTrendsCount(trends2);
  let trends3Count = getTrendsCount(trends3);
  let trendSum = trends1Count + trends2Count + trends3Count;
  return{chart1:trends1Count,chart2:trends2Count,chart3:trends3Count,sum:trendSum};
}
function getTrendsCount (trends)
{
  let count = 0;
  if(trends === null || trends === undefined)
    return count;
  for (let i = 0; i < trends.length; i++)
  {
    //x + or -
    if(trends[i] === null)
      continue;
    let trend = trends[i].trend;
    if(trend ==='+')
      count++;
    if(trend==='-')
      count--;
  }
  return count;

}
