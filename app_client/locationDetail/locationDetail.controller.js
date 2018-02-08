(function () {
  var locationDetailCtrl = function ($routeParams) {
    var vm = this;

    vm.pageHeader = {
      title: $routeParams.locationId
    };
  };

  locationDetailCtrl.$inject = ['$routeParams'];

  angular
    .module('loc8r')
    .controller('locationDetailCtrl', locationDetailCtrl);
})();

/* (function () {
  var locationDetailCtrl = function () {
    var vm = this;

    vm.pageHeader = {
      title: 'Stub'
    };
  };

  angular
    .module('loc8r')
    .controller('locationDetailCtrl', locationDetailCtrl);
})(); */
