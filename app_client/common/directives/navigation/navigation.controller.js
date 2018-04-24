(function () {
  var navigationCtrl = function($location, authentication) {
    var vm = this;
    vm.currentPath = $location.path();
  }
  
  navigationCtrl.$inject = ['$location', 'authentication'];

  angular
    .module('loc8r')
    .controller('navigationCtrl', navigationCtrl);
})();
