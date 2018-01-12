(function () {
  var ratingStars = function () {
    return {
      restrict: 'EA',
      scope: {
        thisRating: '=rating'
      },
      templateUrl: '/common/directives/ratingStars/ratingStars.directive.html'
    };
  };

  angular
    .module('loc8r')
    .directive('ratingStars', ratingStars);
})();
