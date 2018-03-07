(function () {
  var loc8rData = function ($http) {
    return {
      locationByCoords: function (lat, lng) {
        return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=25');
      },
      locationById: function (locationId) {
        return $http.get('/api/locations/' + locationId);
      },
      addReviewById: function (locationId, data) {
        return $http.post('/api/locations/' + locationId + '/reviews', data);
      }
    };
  };

  loc8rData.$inject = ['$http'];

  angular
    .module('loc8r')
    .service('loc8rData', loc8rData);
})();
