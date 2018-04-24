(function () {
  var locationDetailCtrl = function ($routeParams, $location, $uibModal, loc8rData, authentication) {
    var vm = this;

    vm.locationId = $routeParams.locationId;
    vm.isLoggedIn = authentication.isLoggedIn();
    vm.currentPath = $location.path();

    loc8rData.locationById($routeParams.locationId).then(function (response) {
      vm.data = { location: response.data };
      vm.pageHeader = { title: vm.data.location.name };
    }, function (err) {
      console.log(err);
    });

    vm.popUpReviewForm = function () {
      var modalInstance = $uibModal.open({
        templateUrl: '/reviewModal/reviewModal.view.html',
        controller: 'reviewModalCtrl as vm',
        resolve: {
          locationData: function () {
            return {
              locationId: vm.locationId,
              locationName: vm.data.location.name
            };
          }
        }
      });

      modalInstance.result.then(function (response) {
        vm.data.location.reviews.push(response.data);
      });
    };
  };

  locationDetailCtrl.$inject = ['$routeParams', '$location', '$uibModal', 'loc8rData', 'authentication'];

  angular
    .module('loc8r')
    .controller('locationDetailCtrl', locationDetailCtrl);
})();
