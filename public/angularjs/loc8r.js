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

var ratingStars = function () {
  return {
    scope: {
      thisRating: '=rating'
    },
    templateUrl: '/angularjs/rating-stars.html'
  };
};

var loc8rData = function ($http) {
  return $http.get('/api/locations?lng=-0.79&lat=51.3&maxDistance=20');
}

var locationListCtrl = function ($scope, loc8rData) {
  $scope.message = 'Searching for nearby places...';

  loc8rData.success(function (data) {
    $scope.message = data.length > 0 ? '' : 'No locations found';
    $scope.data = { locations: data };
  }).error(function (err) {
    $scope.message = 'Sorry, something\'s gone wrong.';
    console.log(err);
  });
};

angular
  .module('loc8r', [])
  .controller('locationListCtrl', locationListCtrl)
  .filter('formatDistance', formatDistance)
  .directive('ratingStars', ratingStars)
  .service('loc8rData', loc8rData);
