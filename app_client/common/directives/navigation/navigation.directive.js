(function () {
  var navigation = function () {
    return {
      restrict: 'EA',
      templateUrl: '/common/directives/navigation/navigation.template.html',
      controller: 'navigationCtrl as navvm'
    };
  };

  angular
    .module('loc8r')
    .directive('navigation', navigation);
})();
