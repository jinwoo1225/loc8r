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
  return {
    locationByCoords: function (lat, lng) {
      return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=25');
    }
  };
};

var geolocation = function () {
  return {
    getPosition: function (cbSuccess, cbError, cbNoGeo) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
      }
    }
  };
};

var locationListCtrl = function ($scope, loc8rData, geolocation) {
  $scope.message = 'Checking your location...';

  $scope.getData = function (position) {
    // Geolocation intentionally crippled because the locations in the database
    // are in the UK; I don't want to change them and announce where I live to
    // the planet

    /* var lat = position.coords.latitude;
    var lng = position.coords.longitude; */
    var lat = 51.3;
    var lng = -0.79;

    $scope.message = 'Searching for nearby places...';

    loc8rData.locationByCoords(lat, lng).then(function (response) {
      $scope.message = response.data.length > 0 ? '' : 'No locations found';
      $scope.data = { locations: response.data };
    }, function (err) {
      $scope.message = 'Sorry, something\'s gone wrong.';
      console.log(err);
    });
  };

  $scope.showError = function (error) {
    $scope.$apply(function () {
      $scope.message = error.message;
    });
  };

  $scope.noGeo = function () {
    $scope.$apply(function () {
      $scope.message = 'Geolocation not supported by this browser.';
    });
  };

  geolocation.getPosition($scope.getData, $scope.showError, $scope.noGeo);
};

angular
  .module('loc8r', [])
  .controller('locationListCtrl', locationListCtrl)
  .filter('formatDistance', formatDistance)
  .directive('ratingStars', ratingStars)
  .service('loc8rData', loc8rData)
  .service('geolocation', geolocation);
