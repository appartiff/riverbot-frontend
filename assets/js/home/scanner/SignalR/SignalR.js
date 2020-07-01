
    $(function () {
        // Reference the auto-generated proxy for the hub.
        var chat = $.connection.notifyHubcs;

        // Create a function that the hub can call back to display messages.
        chat.client.sendMessage = function (message) {
            // Add the message to the page.

            var obj = message[0];

            console.log(obj["Name"]);
            $("<tr><th> <a><img class=\"icon\" src=\"https://d1x5w42ls10wrx.cloudfront.net/" + obj.Name.replace(/ /g, '') + ".png\"> </img></a></th > <td>" + obj.Name + " - " + obj.Exchange + "_" + obj.Asset + "_" + obj.Timeframe + " - " + obj.Date + "</td> </tr > ").prependTo(".paminnelser > tbody");
            //+ htmlEncode(name)
            //    + '</strong>: ' + htmlEncode(message) + '</p>' + '</li>'
        };

        chat.client.updateNotifications = function (item) {

            var date = new Date(item.lastTime);
            $("<tr><th> <a><img class=\"icon\" src=\"https://d1x5w42ls10wrx.cloudfront.net/" +
                item.Name.replace(/ /g, '') +
                ".png\"> </img></a></th > <td> <p class=\"patternName\">" +
                item.Name +
                "</p>  <p class=\"assetName\">" +
                item.Exchange + "_" + item.Asset + "_" + item.Timeframe +
                "</p><p class=\"time\">" + timeSince(date) + " ago </p>"
                +
                "</td> </tr > ").prependTo(".paminnelser > tbody");
            playSound();

        };
        $.connection.hub.start().done(function () {

            $('.connection-status').addClass('online').removeClass('offline').text("Online");

        }).fail(function () {
            $('.connection-status').addClass('offline').removeClass('online').text("Offline");
        });

    });

function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}
var notificationsInstance = (function () {
    let notificationList = [];
    //private Functions
    function callFetch()
    {



        fetchAsync("/api/patternsNotifications/").then(kake =>
        {
            for (var i = 0, len = kake.length; i < len; i++) {
                let item = kake[i];
                console.log(item);
                var date = new Date(item.lastTime);
                $("<tr><th> <a><img class=\"icon\" src=\"https://d1x5w42ls10wrx.cloudfront.net/" +
                    item.name.replace(/ /g,'') +
                    ".png\"> </img></a></th > <td> <p class=\"patternName\">" +
                    item.name +
                    "</p>  <p class=\"assetName\">" +
                    item.exchange + "_" + item.asset + "_" + item.timeframe +
                    "</p><p class=\"time\">" + timeSince(date) + " ago </p>"
                    +
                    "</td> </tr > ").prependTo(".paminnelser > tbody");
                // for later usage
                //notificationList.push(item);
            }
        })
    }
    return { // public interface
        getAndAppend: function () {
            callFetch();
        },

    };
})();

function playSound() {
    var mp3Source = '<source src="' + 'https://d1x5w42ls10wrx.cloudfront.net/fin' + '.mp3" type="audio/mpeg">';
    var embedSource = '<embed hidden="true" autostart="true" loop="false" src="' + '.mp3">';
    document.getElementById("sound").innerHTML = '<audio autoplay="autoplay">' + mp3Source + embedSource + '</audio>';
}

// This optional function html-encodes messages for display in the page.
function htmlEncode(value) {
    var encodedValue = $('<div />').text(value).html();
    return encodedValue;
}
