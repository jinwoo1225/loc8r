(function () {
  var _isNumeric = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  var formatDistance = function () {
    return function (distance) {
      var roundedDistance, unit;

      if (distance && _isNumeric(distance)) {
        if (distance > 1) {
          roundedDistance = parseFloat(distance).toFixed(1);
          unit = 'km';
        } else {
          roundedDistance = parseInt(distance * 1000, 10);
          unit = 'm';
        }

        return roundedDistance + ' ' + unit;
      } else {
        return '?';
      }
    };
  };

  angular
    .module('loc8r')
    .filter('formatDistance', formatDistance);
})();
