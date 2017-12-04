module.exports.homeList = function (req, res) {
  res.render('locations-list', {
    title: 'Loc8r - Find a Place to Work with Wi-Fi',
    pageHeader: {
      title: 'Loc8r',
      strapLine: 'Find places to work with wifi near you!'
    },
    sidebar: 'Looking for Wi-Fi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you\'re looking for.',
    locations: [
      {
        name: 'Starcups',
        address: '125 High Street, Reading, RG6 1PS',
        rating: 3,
        facilities: ['Hot Drinks', 'Food', 'Premium Wi-Fi'],
        distance: '100m'
      },
      {
        name: 'Café Hero',
        address: '125 High Street, Reading, RG6 1PS',
        rating: 4,
        facilities: ['Hot Drinks', 'Food', 'Premium Wi-Fi'],
        distance: '200m'
      },
      {
        name: 'Burger Queen',
        address: '125 High Street, Reading, RG6 1PS',
        rating: 2,
        facilities: ['Food', 'Premium Wi-Fi'],
        distance: '250m'}

    ]
  });
};

module.exports.locationInfo = function (req, res) {
  res.render('location-info', {
    title: 'Location Info',
    pageHeader: {title: 'Starcups'},
    sidebar: {
      context: 'is on Loc8r because it has accessible Wi-Fi and space to sit down with your laptop and get some work done.',
      callToAction: 'If you\'ve been here and you like it—or if you don\'t—please leave a review to help other people just like you.'
    },
    location: {
      name: 'Starcups',
      address: '125 High Street, Reading, RG6 1PS',
      rating: 3,
      facilities: ['Hot Drinks', 'Food', 'Premium Wi-Fi'],
      coords: {lat: 51.455041, lng: -0.9690884},
      openingTimes: [
        {
          days: 'Monday - Friday',
          opening: '7:00 am',
          closing: '7:00 pm',
          closed: false
        },
        {
          days: 'Saturday',
          opening: '8:00 am',
          closing: '5:00 pm',
          closed: false
        },
        {
          days: 'Sunday',
          closed: true
        }
      ],
      reviews: [
        {
          author: 'Simon Holmes',
          rating: 5,
          timestamp: '16 July 2013',
          reviewText: 'What a great place! I can\'t say enough good things about it.'
        },
        {
          author: 'Charlie Chaplin',
          rating: 3,
          timeStamp: '16 June 2013',
          reviewText: 'It was OK. Coffee wasn\'t great, but the Wi-Fi was fast.'
        }
      ]
    }
  });
};

module.exports.addReview = function (req, res) {
  res.render('location-review-form', {
    title: 'Review Starcups on Loc8r',
    pageHeader: {title: 'Review Starcups'}
  });
};
