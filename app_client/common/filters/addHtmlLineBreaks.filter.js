(function () {
  var addHtmlLineBreaks = function () {
    return function (text) {
      return text.replace(/\n/g, '<br/>');
    };
  };

  angular
    .module('loc8r')
    .filter('addHtmlLineBreaks', addHtmlLineBreaks);
})();
