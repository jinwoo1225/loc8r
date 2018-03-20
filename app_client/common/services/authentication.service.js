(function () {
  var authentication = function ($window) {
    return {
      saveToken: function (token) {
        $window.localStorage['loc8rToken'] = token;
      },
      getToken: function () {
        return $window.localStorage['loc8rToken'];
      }
    };
  };

  authentication.$inject = ['$window'];

  angular
    .module('loc8r')
    .service('authentication', authentication);
})();
