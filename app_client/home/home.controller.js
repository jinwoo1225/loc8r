var homeCtrl = function ($scope) {
  $scope.pageHeader = {
    title: 'Loc8r',
    strapline: 'Find places to work with Wi-Fi near you!'
  };
  $scope.sidebar = {
    content: 'Looking for Wi-Fi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you\'re looking for.'
  };
};

angular
  .module('loc8r')
  .controller('homeCtrl', homeCtrl);
