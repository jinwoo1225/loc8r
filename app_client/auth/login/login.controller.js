(function () {
  var loginCtrl = function($location, authentication) {
    var vm = this;

    vm.pageHeader = {
      title: 'Sign in to Loc8r'
    };

    vm.credentials = {
      email : '',
      password : ''
    };

    vm.returnPage = $location.search().page || '/';

    vm.onSubmit = function () {
      vm.formError = '';
      if (!vm.credentials.email || !vm.credentials.password) {
        vm.formError = 'All fields are required; please try again';
        return false;
      } else {
        vm.login();
      }
    };

    vm.login = function() {
      vm.formError = '';
      authentication
        .login(vm.credentials)
        .then(function() {
          $location.search('page', null); 
          $location.path(vm.returnPage);
        }, function (err) {
          vm.formError = err;
        });
    };
  }
  
  angular
    .module('loc8r')
    .controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = ['$location','authentication'];
})();
