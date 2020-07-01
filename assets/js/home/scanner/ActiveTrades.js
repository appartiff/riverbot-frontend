const activeTradesInstance = (function () {
    let activeTrades = [];

    function comparer(otherArray) {
        return function (current) {
            return otherArray.filter(function (other) {
                return other.id === current.id
            }).length === 0;
        }
    }

    function deleteOld(input) {
        var onlyInOld = activeTrades.filter(comparer(input));
        for (var i = 0; i < onlyInOld.length; i++) {
            document.getElementById('#active_' + onlyInOld[i].id).outerHTML = "";
        }
    }

    function calculateRR(entry, target, stoploss) {
        //bearish
        if (entry > 0 && target > 0 && stoploss > 0) {
            if (entry > target) {

                var risk = stoploss - entry;
                var profit = entry - target;
                var RR = profit / risk;
                return RR.toFixed(2);
            }
            //bullish
            else {
                var risk = entry - stoploss;
                var profit = target - entry;
                var RR = profit / risk;
                return RR.toFixed(2);
            }
        } else {
            return 0;
        }
    }

    function getRRcolor(RR, desiredRR) {
        if (RR > desiredRR) {
            return "perfect";
        } else {
            return "bad";
        }
    }

    function append(response) {

        //get statistics
        let statistics = patternStatisticsInstance.getStatistics();
        var enabledicon = {
            true: {
                className: "fas fa-check-circle good big"
            },
            false: {
                className: "fas fa-times-circle  bad big"
            }
        };
        for (var i = 0; i < response.length; i++) {
            let item = response[i];

            //if true then object already exists
            if (item.old == true) {
                console.log(true);
            }
            //fresh
            else {
                item.old = true;
                var arrow = "";

                if (~item.pattern.indexOf("Bullish")) {
                    arrow = '<i class=\"fas fa-angle-up up big\" name=\"arrow-dropdown\"></i>';
                } else if (~item.pattern.indexOf("Bearish")) {
                    arrow = '<i class=\"fas fa-angle-down down big\" name=\"arrow-dropdown\"></i>';
                }

                ////DesiredRR
                let results = statistics.find(x => x.pattern === item.pattern);
                let winRate = results.winRate;

                let desiredIncome = 40;
                let reccommendedRR = ((desiredIncome + 100) / (2 * winRate)).toFixed(2);

                let rrElement = [];
                let targetReachedelement = [];
                let rrList = [];
                for (var x = 0; x < item.targets.length; x++) {

                    let targetItem = item.targets[x];
                    let targetrr = calculateRR(item.currentPrice, targetItem.y1, item.stoploss.y1);
                    let rrColor = getRRcolor(targetrr, reccommendedRR);
                    targetReachedelement.push('<li><span>T' + (x + 1) + ' hit:</span><i class=\"' + enabledicon[item.targets[x].targetReached].className + '\"></i> </li>');
                    rrElement.push('<li class=\"' + rrColor + '\"><span>T' + (x + 1) + ' RR:</span> ' + targetrr + '</li>');
                    rrList.push(targetrr);
                }

                let rr1 = calculateRR(item.currentPrice, item.targets[0].y1, item.stoploss.y1);

                let tilt = "";
                if (item.targets[0].targetReached || rrList[0] < reccommendedRR) {
                    tilt = "tint-purple";
                } else if (rr1 > reccommendedRR && item.targets[0].targetReached == false) {
                    tilt = "tint-blue"
                }

                let bigString = [
                    '<div id=\"active_' + item.id + '\">',
                    '<ul class=\"active-ul ' + tilt + '\">',
                    '<li>' + arrow + '</li>',
                    '<li><span>' + item.pattern + ' - ' + item.asset + '</span></li>',
                    '</ul>',
                    '<div class=\"panel-info collapse\">',
                    '<ul>',
                    '<li class=\"perfect\"><span>Recommended RR1: </span>' + reccommendedRR + '+</li>',
                    '</ul>',
                    '<ul>',
                    rrElement.join(''),

                    '</ul>',
                    '<ul>',
                    targetReachedelement.join(''),
                    '</ul>',
                    '</div>',
                    '</div>'
                ];
                $('.active-trades .panel').append(bigString.join(''));
            }

        }

        activeTrades = response;

    }
    //private Functions
    function fetchFromApi(handleData) {
        $.ajax({
            url: "/api/activetrades/",
            type: "GET",
            contentType: 'application/json',
            error: function () { },
            success: function (data) {
                handleData(data);

            }

        });
    }
    //private Functions ends here
    return { // public interface
        fetchFromApi: function () {
            fetchFromApi(function (output) {
                ////delete old
                //deleteOld(response);

                //deletes old trades
                let onlyInNew = output.filter(comparer(activeTrades));
                append(onlyInNew);
            });

        },

        append: function () {

        }

    };
})();
