(function () {
  var footerGeneric = function () {
    return {
      restrict: 'EA',
      templateUrl: '/common/directives/footerGeneric/footerGeneric.template.html'
    };
  };

  angular
    .module('loc8r')
    .directive('footerGeneric', footerGeneric);
})();
