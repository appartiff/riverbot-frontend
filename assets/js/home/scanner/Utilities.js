function returnMagnitude(x) {
    var m = -Math.floor(Math.log(x) / Math.log(10) + 1);
    if (m < 0 || m >= 100) {
        return x;
    }
    else {
        return x.toFixed(3 + m);
    }
}
