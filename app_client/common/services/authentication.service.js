(function () {
  var authentication = function ($window) {
    var saveToken = function (token) {
        $window.localStorage['loc8rToken'] = token;
    };
    
    var getToken = function () {
      return $window.localStorage['loc8rToken'];
    };
    
    var isLoggedIn = function () {
      var token = getToken();

      if (token) {
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    return {
      saveToken: saveToken,
      getToken: getToken,
      register: function (user) {
        return $http.post('/api/register', user).then(function (response) {
          saveToken(response.data.token);
        };
      },
      login: function (user) {
        return $http.post('/api/login', user).then(function (response) {
          saveToken(response.data.token);
        };
      },
      logout: function () {
        $window.localStorage.removeItem('loc8rToken');
      },
      isLoggedIn: isLoggedIn,
      currentUser: function () {
        if (isLoggedIn()) {
          var token = getToken();
          var payload = JSON.parse($window.atob(token.split('.')[1]));

          return {
            email: payload.email,
            name: payload.name
          };
        }
      }
    };
  };

  authentication.$inject = ['$window'];

  angular
    .module('loc8r')
    .service('authentication', authentication);
})();
