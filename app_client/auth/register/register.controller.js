(function () {
  var registerCtrl = function ($location, authentication) {
    var vm = this;

    vm.pageHeader = {
      title: 'Create a New Loc8r Account'
    };

    vm.credentials = {
      name : '',
      email : '',
      password : ''
    };

    vm.returnPage = $location.search().page || '/';

    vm.onSubmit = function () {
      vm.formError = '';
      if (!vm.credentials.name || !vm.credentials.email || !vm.credentials.password) {
        vm.formError = 'All fields are required; please try again';
        return false;
      } else {
        vm.register();
      }
    };

    vm.register = function() {
      vm.formError = '';
      authentication
        .register(vm.credentials)
        .then(function() {
          $location.search('page', null); 
          $location.path(vm.returnPage);
        }, function (err) {
          vm.formError = err;
        });
    };
  };

  registerCtrl.$inject = ['$location', 'authentication'];

  angular
    .module('loc8r')
    .controller('registerCtrl', registerCtrl);
})();
