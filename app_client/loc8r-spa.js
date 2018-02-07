(function () {
  var config = function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode({
     enabled: true,
     requireBase: false
    });
  };

  angular
    .module('loc8r', ['ngRoute'])
    .config(['$routeProvider', '$locationProvider', config]);
})();
