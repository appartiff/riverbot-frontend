const patternStatisticsInstance = (function () {
    //setInterval(function () { refreshActiveTrades() }, 300000);
    let statistics = [];
    //private Functions
    function fetchStatistics() {
        $.ajax({
            url: "/api/statistics/",
            type: "GET",
            contentType: 'application/json',
            error: function () {

            },
            success: function (data) {

                console.log(data);
                statistics = data.patternStatistics;
            }
        });
    }
    //private Functions ends here
    return { // public interface
        fetchFromApi: function (input) {
            fetchStatistics();
        },
        getStatistics: function () {
            return statistics;
        }
    };
})();