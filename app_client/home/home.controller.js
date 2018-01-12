(function () {
  var homeCtrl = function ($scope, loc8rData, geolocation) {
    var vm = this;

    vm.pageHeader = {
      title: 'Loc8r',
      strapline: 'Find places to work with Wi-Fi near you!'
    };

    vm.sidebar = {
      content: 'Looking for Wi-Fi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you\'re looking for.'
    };

    vm.message = 'Checking your location...';

    vm.getData = function (position) {
      // Geolocation intentionally crippled because the locations in the database
      // are in the UK; I don't want to change them and announce where I live to
      // the planet

      /* var lat = position.coords.latitude;
      var lng = position.coords.longitude; */
      var lat = 51.3;
      var lng = -0.79;

      vm.message = 'Searching for nearby places...';

      loc8rData.locationByCoords(lat, lng).then(function (response) {
        vm.message = response.data.length > 0 ? '' : 'No locations found';
        vm.data = { locations: response.data };
      }, function (err) {
        vm.message = 'Sorry, something\'s gone wrong.';
        console.log(err);
      });
    };
    
    vm.showError = function (error) {
      $scope.$apply(function () {
        vm.message = error.message;
      });
    };

    vm.noGeo = function () {
      $scope.$apply(function () {
        vm.message = 'Geolocation not supported by this browser.';
      });
    };

    geolocation.getPosition(vm.getData, vm.showError, vm.noGeo);
  };

  homeCtrl.$inject = ['$scope', 'loc8rData', 'geolocation'];

  angular
    .module('loc8r')
    .controller('homeCtrl', homeCtrl);
})();
