const assetinstance = (function () {
    let selectedAsset = 'USDT_BTC';
    let selectedExchange = 'Poloniex';
    //private Functions

    //private Functions ends here
    return { // public interface

        setPoloniex: function () {
            selectedExchange = "Poloniex";
            timeFramesInstance.appendTimeFrames();
        },
        setBitfinex: function () {
            selectedExchange = "Bitfinex";
            timeFramesInstance.appendTimeFrames();
        },
        setBitmex: function () {
            selectedExchange = "Bitmex";
            timeFramesInstance.appendTimeFrames();
        },
        getExchange: function () {
            return selectedExchange;
        },
        setAsset: function (input) {
            selectedAsset = input;
        },
        getAsset: function () {
            return selectedAsset;
        }
    };
})();
