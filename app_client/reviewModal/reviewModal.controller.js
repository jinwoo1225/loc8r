(function () {
  var reviewModalCtrl = function ($uibModalInstance, locationData) {
    var vm = this;

    $uibModalInstance.result.catch(function () { $uibModalInstance.close(); });

    vm.locationData = locationData;
    vm.modal = {
      cancel: function () {
        $uibModalInstance.dismiss('cancel');
      }
    };
  };

  reviewModalCtrl.$inject = ['$uibModalInstance', 'locationData'];

  angular
    .module('loc8r')
    .controller('reviewModalCtrl', reviewModalCtrl);
})();
