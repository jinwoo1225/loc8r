(function () {
  var reviewModalCtrl = function ($uibModalInstance) {
    var vm = this;

    $uibModalInstance.result.catch(function () { $uibModalInstance.close(); });

    vm.modal = {
      cancel: function () {
        $uibModalInstance.dismiss('cancel');
      }
    };
  };

  reviewModalCtrl.$inject = ['$uibModalInstance'];

  angular
    .module('loc8r')
    .controller('reviewModalCtrl', reviewModalCtrl);
})();
