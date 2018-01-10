var geolocation = function () {
  return {
    getPosition: function (cbSuccess, cbError, cbNoGeo) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
      } else {
        cbNoGeo();
      }
    }
  };
};

angular
  .module('loc8r')
  .service('geolocation', geolocation);
