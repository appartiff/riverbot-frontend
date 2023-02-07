import axios from "axios";
import {ProcessMotionLine} from "../processMotionLine";
import {getCandles} from "./getCandles";
import {MotionLine} from "../plotMotionLine";
import {plotTimeTrendline, plotPriceTrendline, plotBiasTrendline} from "./plotTrendLine";
import {getTrendlineLegsOnhigherResolution} from "./getTrendlineLegsOnHigherResolution";
import {getTrendlineLegsFromHigherToLowerResolution} from "./getTrendlineLegsFromHigherToLowerResolution";
import {plotElementIncontrolColor} from "../plotElementInControlColor";

export function ProcessTrendline(plot,plotX5, chart, ohlc, trends, selectedAsset,config)
{

  let channelZones = config.river.channel.zones;
  let legs = getTrendlineLegsOnhigherResolution(plotX5);
  getTrendlineLegsFromHigherToLowerResolution(plot,legs);
  console.log(trends);
  for (let i = 0; i < trends.length; i++)
  {
    let item = trends[i];
    if(trends[i]===null)
      trends.splice(i,1);
  }
  for (let i = 0; i < trends.length; i++)
  {
    let item = trends[i];
    if (item.trend === 'x')
      trends.splice(i, 1);
  }


  if(trends.length > 0)
  {
    trends.sort((a, b) => (a.plot.x > b.plot.x) ? 1 : -1);
    //time is equal
    if(trends[0].plot.x === trends[1].plot.x)
    {
      if(trends[0].name === 'time')
      {
        plotTimeTrendline(chart, ohlc, legs, '#effb80');
        plotElementIncontrolColor(chart,plot,trends[0]);
        return;
      }
     else if(trends[1].name === 'time')
      {
        plotTimeTrendline(chart, ohlc, legs, '#effb80');
        plotElementIncontrolColor(chart,plot,trends[1]);
        return;
      }
       if(trends[0].name === 'bias')
      {
        plotBiasTrendline(chart, ohlc, legs, '#3cb4ff');
        plotElementIncontrolColor(chart,plot,trends[0]);
        return;
      }
       else if(trends[1].name === 'bias')
       {
         plotBiasTrendline(chart, ohlc, legs, '#3cb4ff');
         plotElementIncontrolColor(chart,plot,trends[1]);
         return;
       }

      if(trends[0].name === 'price')
      {
        plotPriceTrendline(chart, ohlc, legs, '#af6af5', channelZones);
        plotElementIncontrolColor(chart,plot,trends[0]);
        return;
      }
      else if(trends[1].name === 'price')
      {
        plotPriceTrendline(chart, ohlc, legs, '#af6af5', channelZones);
        plotElementIncontrolColor(chart,plot,trends[1]);
        return;
      }

    }
    else if(trends.length === 3 && trends[0].plot.x === trends[1].plot.x && trends[0].plot.x === trends[2].plot.x)
    {
      if(trends[0].name === 'time')
      {
        plotTimeTrendline(chart, ohlc, legs, '#effb80');
        plotElementIncontrolColor(chart,plot,trends[0]);
        return;
      }
      if(trends[1].name === 'time')
      {
        plotTimeTrendline(chart, ohlc, legs, '#effb80');
        plotElementIncontrolColor(chart,plot,trends[1]);
        return;
      }
      if(trends[2].name === 'time')
      {
        plotTimeTrendline(chart, ohlc, legs, '#effb80');
        plotElementIncontrolColor(chart,plot,trends[2]);
        return;
      }

      if(trends[0].name === 'bias')
      {
        plotBiasTrendline(chart, ohlc, legs, '#3cb4ff');
        plotElementIncontrolColor(chart,plot,trends[0]);
        return;
      }
      if(trends[1].name === 'bias')
      {
        plotBiasTrendline(chart, ohlc, legs, '#3cb4ff');
        plotElementIncontrolColor(chart,plot,trends[1]);
        return;
      }
      if(trends[2].name === 'bias')
      {
        plotBiasTrendline(chart, ohlc, legs, '#3cb4ff');
        plotElementIncontrolColor(chart,plot,trends[2]);
        return;
      }

       if(trends[0].name === 'price')
       {
         plotPriceTrendline(chart, ohlc, legs, '#af6af5', channelZones);
         plotElementIncontrolColor(chart,plot,trends[0]);
         return;
       }
       if( trends[1].name === 'price')
       {
         plotPriceTrendline(chart, ohlc, legs, '#af6af5', channelZones);
         plotElementIncontrolColor(chart,plot,trends[1]);
         return;
       }
       if(trends[2].name === 'price')
       {
         plotPriceTrendline(chart, ohlc, legs, '#af6af5', channelZones);
         plotElementIncontrolColor(chart,plot,trends[2]);
         return;
       }

    }
    else
    {
      if(trends[0].name === 'bias')
      {
        plotBiasTrendline(chart, ohlc, legs, '#3cb4ff');
        plotElementIncontrolColor(chart,plot,trends[0]);
        return;
      }
      if(trends[0].name === 'price')
      {
        plotPriceTrendline(chart, ohlc, legs, '#af6af5', channelZones);
        plotElementIncontrolColor(chart,plot,trends[0]);
        return;
      }
      if(trends[0].name === 'time')
      {
        plotTimeTrendline(chart, ohlc, legs, '#effb80');
        plotElementIncontrolColor(chart,plot,trends[0]);
      }
    }
  }

}
