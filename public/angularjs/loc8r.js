var locationListCtrl = function ($scope) {
  $scope.data = {
    locations: [{
	    'name': 'Starcups',
    	'address': '125 High Street, Reading, RG6 1PS',
    	'rating': 3,
      'facilities': ['Hot Drinks', 'Food', 'Premium Wi-Fi'],
      'distance': 14.6,
      '_id': '5a27ab691c5e0a989c0634da'
    }, {
	    'name': 'Café Hero',
    	'address': '125 High Street, Reading, RG6 1PS',
    	'rating': 4,
      'facilities': ['Hot Drinks', 'Food', 'Premium Wi-Fi'],
      'distance': 14.6,
      '_id': '5a2cdcc9877c0bf8cdf47355'
    }, {
	    'name': 'Burger Queen',
    	'address': '125 High Street, Reading, RG6 1PS',
    	'rating': 2,
      'facilities': ['Food', 'Premium Wi-Fi'],
      'distance': 14.6,
      '_id': '5a2ce5ae877c0bf8cdf47358'
    }]
  };
};

angular
  .module('loc8r', [])
  .controller('locationListCtrl', locationListCtrl);
