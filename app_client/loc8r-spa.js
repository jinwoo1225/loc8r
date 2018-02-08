(function () {
  var config = function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })
      .when('/about', {
        templateUrl: 'common/views/genericText.view.html',
        controller: 'aboutCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode({
     enabled: true,
     requireBase: false
    });
  };

  angular
    .module('loc8r', ['ngRoute', 'ngSanitize'])
    .config(['$routeProvider', '$locationProvider', config]);
})();
