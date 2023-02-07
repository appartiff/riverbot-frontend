//import {store} from '../store/store';
import * as signalR from '@aspnet/signalr';

const signalrService = (function ()
{
  "use strict";
  let connected = false;
  let autoConnection = true;
  let previousSubscribedGroup = null;
  const connection = new signalR.HubConnectionBuilder().withUrl("http://localhost:4000/notificationHub").build();

  connection.on("ReceiveMessage", function (message) {
    console.log("received message");
    let msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    console.log(msg);
  });
  connection.on("ReceiveCandle", function (message)
  {
    let msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
   // store.dispatch('chartCandles/addCandles');
  });
  function Connect()
  {
    if (!connected)
    {
      autoConnection = true;
      console.log("connecting");
      connection.start().then(function () {
        connected = true;
        console.log("signalR connected");
        Connect();
      }).catch(function (err) {
        return console.error(err.toString());
      })
    }
  }
  function Disconnect()
  {
    if (connected) {
      autoConnection = false;
      connection.stop().then(function ()
      {

        console.log('disconnected');
        connected = false;
      })
    }
  }

  connection.onclose(function (e)
  {
    connected = false;
    console.log('Connection Closed');
    if(autoConnection)
    {
      Connect();
    }

  });

  function Unsubscribe() {
  }

  function waitForConnection(callback) {
    setTimeout(
      function () {
        if (connected) {
          if (callback != null) {
            callback();
          }
        } else {
          waitForConnection(callback);
        }
      }, 100);
  }

  function SubscribeToFreeService() {
    waitForConnection(function () {
      console.log("got connection");
      connection.invoke("SubscribeToFreeService").catch(function (err) {
        return console.log(err.toString());
      });
    });
  }

  function SubscribeToCandle(exchange, asset, timeframe) {
    waitForConnection(function () {
      let group = exchange.concat(asset, timeframe).toLowerCase();
      console.log(group);
      connection.invoke("SubscribeToCandle", group).catch(function (err) {
        console.log(err.toString());
      });
      HandlePreviousGroup(group);
    });
  }

  function SubscriptionHandler(membership, exchange, timeframe, asset) {
    if (membership === 'free') {
      SubscribeToFreeService();
    } else if (membership === 'pro') {

    } else if (membership === 'premium')
    {

    } else {
      console.log("Error no membership found");
    }
  }

  function HandlePreviousGroup(group) {
    if (previousSubscribedGroup !== null) {
      let prev = previousSubscribedGroup;
      connection.invoke("RemoveFromGroup", prev)
    }
    previousSubscribedGroup = group;
  }

  return {
    subscribe: function (membership, exchange, asset, time) {
      SubscriptionHandler(membership, exchange, time, asset);
    },
    subscribeToCandle: function (exchange, asset, time) {
      SubscribeToCandle(exchange, asset, time);
    },
    connect: function ()
    {
      Connect();
    },
    disconnect: function () {
      Disconnect();
    }

  }
})();
export {signalrService};
