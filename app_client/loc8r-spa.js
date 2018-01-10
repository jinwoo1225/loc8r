var config = function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'home/home.view.html',
      controller: 'homeCtrl',
      controllerAs: 'vm'
    })
    .otherwise({redirectTo: '/'});
};

angular
  .module('loc8r', ['ngRoute'])
  .config(['$routeProvider', config]);
