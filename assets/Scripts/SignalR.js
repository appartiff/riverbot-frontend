//<script type="text/javascript">
//    $(function ()
//{
//        // Reference the auto-generated proxy for the hub.
//        var chat = $.connection.notifyHubcs;


//    // Create a function that the hub can call back to display messages.
//        chat.client.sendMessage = function (message) {
//            // Add the message to the page.

//            var obj = message[0];

//    console.log(obj["Name"]);
//            $("<tr><th> <a><img class=\"icon\" src=\"https://d1x5w42ls10wrx.cloudfront.net/" + obj.Name.replace(/ /g, '') + ".png\"> </img></a></th > <td>" + obj.Name + " - " + obj.Exchange + "_" + obj.Asset + "_" + obj.Timeframe + " - " + obj.Date + "</td> </tr > ").prependTo(".paminnelser > tbody");
//            //+ htmlEncode(name)
//            //    + '</strong>: ' + htmlEncode(message) + '</p>' + '</li>'
//        };


//chat.client.updateNotifications = function (obj) {

//    $("<tr><th> <a><img class=\"icon\" src=\"https://d1x5w42ls10wrx.cloudfront.net/" +
//        obj.Name.replace(/ /g, '') +
//        ".png\"> </img></a></th > <td>" +
//        obj.Name +
//        " - " +
//        obj.Exchange + "_" + obj.Asset + "_" + obj.Timeframe +
//        " - " +
//        obj.Date +
//        "</td> </tr > ").prependTo(".paminnelser > tbody");
//    playSound();



//};
//$.connection.hub.start().done(function () {

//    $('.connection-status').addClass('online').removeClass('offline').text("Online");

//}).fail(function () {
//    $('.connection-status').addClass('offline').removeClass('online').text("Offline");
//});

//function playSound() {
//    var mp3Source = '<source src="' + 'https://d1x5w42ls10wrx.cloudfront.net/fin' + '.mp3" type="audio/mpeg">';
//    var embedSource = '<embed hidden="true" autostart="true" loop="false" src="' + '.mp3">';
//    document.getElementById("sound").innerHTML = '<audio autoplay="autoplay">' + mp3Source + embedSource + '</audio>';
//}

//// This optional function html-encodes messages for display in the page.
//function htmlEncode(value) {
//    var encodedValue = $('<div />').text(value).html();
//    return encodedValue;
//}
//</script >
