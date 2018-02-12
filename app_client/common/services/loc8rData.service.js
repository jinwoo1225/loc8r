(function () {
  var loc8rData = function ($http) {
    return {
      locationByCoords: function (lat, lng) {
        return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=25');
      },
      locationById: function (locationId) {
        return $http.get('/api/locations/' + locationId);
      }
    };
  };

  loc8rData.$inject = ['$http'];

  angular
    .module('loc8r')
    .service('loc8rData', loc8rData);
})();
