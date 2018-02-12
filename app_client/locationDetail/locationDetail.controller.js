(function () {
  var locationDetailCtrl = function ($routeParams, loc8rData) {
    var vm = this;

    loc8rData.locationById($routeParams.locationId).then(function (response) {
      vm.data = { location: response.data };
      vm.pageHeader = { title: vm.data.location.name };
    }, function (err) {
      console.log(err);
    });
  };

  locationDetailCtrl.$inject = ['$routeParams', 'loc8rData'];

  angular
    .module('loc8r')
    .controller('locationDetailCtrl', locationDetailCtrl);
})();
