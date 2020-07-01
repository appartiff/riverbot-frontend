//singleton instance of Timeframes
var timeFramesInstance = (function () {
    let selectedExchange = '';
    let selectedTimeFrame = '15min';
    let timeFramesList =
        {
            "Poloniex":
                [
                    { value: '15min', text: '15 minutes' },
                    { value: '30min', text: '30 minutes' },
                    { value: '2hour', text: '2 hours' },
                    { value: '4hour', text: '4 hours' },
                    { value: 'Daily', text: '1 day' }
                ],
            "Bitfinex":
                [
                    { value: '15min', text: '15 minutes' },
                    { value: '30min', text: '30 minutes' },
                    { value: '1hour', text: '1 hour' },
                    { value: '3hour', text: '3 hours' },
                    { value: '6hour', text: '6 hours' },
                    { value: 'Daily', text: '1 day' }

                ],
            "Bitmex":
                [
                    { value: '1hour', text: '1 hour' }
                ],
        };

    //make a function to get objectValue to send to api for OHLC data

    //private Functions
    function appendTimeFrames() {
        //if not exchange is selected beforehand
        let inputExchange = assetinstance.getExchange();

        //set
        selectedExchange = inputExchange;
        let exchangeList = timeFramesList[inputExchange];

        var ul = document.getElementById("timeframes-list");
        $(ul).empty();
        for (index = 0; index < exchangeList.length; ++index) {
            let item = exchangeList[index];
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(item.text));
            ul.appendChild(li);
        }

    }
    //private Functions ends here
    return { // public interface
        appendTimeFrames: function () {
            appendTimeFrames();
            let exchange = assetinstance.getExchange();
            let value = timeFramesList[exchange][0].text;
            $('#timeframes-button').html(value);
        },
        setTimeFrame: function (input) 
        {
            let exchange = assetinstance.getExchange();
            selectedTimeFrame = timeFramesList[exchange][input].value;
        },
        getSelectedTimeFrame: function () {
            return selectedTimeFrame;
        }

    };
})();