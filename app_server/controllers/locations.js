const request = require('request');
const apiOptions = {
  server: 'http://localhost:3000'
};

const formatDistance = function (distance) {
  let roundedDistance, unit;

  if (distance > 1) {
    roundedDistance = parseFloat(distance).toFixed(1);
    unit = 'km';
  } else {
    roundedDistance = parseInt(distance * 1000, 10);
    unit = 'm';
  }

  return `${roundedDistance} ${unit}`;
};

const _showError = function (req, res, status) {
  let title, content;

  if (status === 404) {
    title = '404: Page Not Found';
    content = 'Oh dear. Looks like we can\'t find this page. Sorry.';
  } else {
    title = `${status}: Something's Gone Wrong`;
    content = 'Something, somewhere, has gone just a little bit wrong.';
  }

  res.status(status);
  res.render('generic-text', {
    title: title,
    content: content
  });
};

const getLocationInfo = function (req, res, callback) {
  const path = '/api/locations/' + req.params.locationId;
  const requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {},
  };

  request(requestOptions, function (err, response, body) {
    if (response.statusCode === 200) {
      body.coords = {lng: body.coords[0], lat: body.coords[1]};
      callback(req, res, body);
    } else {
      _showError(req, res, response.statusCode);
    }
  });
};

const renderHomePage = function (req, res, body) {
  res.render('location-list', {
    title: 'Loc8r - Find a Place to Work with Wi-Fi',
    pageHeader: {
      title: 'Loc8r',
      strapLine: 'Find places to work with wifi near you!'
    },
    sidebar: 'Looking for Wi-Fi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you\'re looking for.',
  });
};

const renderLocationPage = function (req, res, body) {
  res.render('location-info', {
    title: body.name,
    pageHeader: {title: body.name},
    sidebar: {
      context: 'is on Loc8r because it has accessible Wi-Fi and space to sit down with your laptop and get some work done.',
      callToAction: 'If you\'ve been here and you like it—or if you don\'t—please leave a review to help other people just like you.'
    },
    location: body
  });
};

const renderReviewForm = function (req, res, body) {
  res.render('location-review-form', {
    title: `Review ${body.name} on Loc8r`,
    pageHeader: {title: `Review ${body.name}`},
    error: req.query.error
  });
};

module.exports.homeList = function (req, res) {
  const path = '/api/locations';
  const requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {},
    qs: {
      lng: -0.7992599,
      lat : 51.378091,
      maxDistance: 20
    }
  };

  request(requestOptions, function (err, response, body) {
    if (response.statusCode === 200 && body.length !== 0) {
      for (let i = 0; i < body.length; i++) {
        body[i].distance = formatDistance(body[i].distance);
      }
    }

    renderHomePage(req, res, body);
  });
};

module.exports.locationInfo = function (req, res) {
  getLocationInfo(req, res, function (req, res, body) {
    renderLocationPage(req, res, body);
  });
};

module.exports.addReviewGet = function (req, res) {
  getLocationInfo(req, res, function (req, res, body) {
    renderReviewForm(req, res, body);
  });
};

module.exports.addReviewPost = function (req, res) {
  const locationId = req.params.locationId;
  const path = '/api/locations/' + locationId + '/reviews';
  const postData = {
    author: req.body.name,
    rating: parseInt(req.body.rating, 10),
    reviewText: req.body.review
  };
  const requestOptions = {
    url: apiOptions.server + path,
    method: 'POST',
    json: postData
  };

  if (!postData.author || !postData.rating || !postData.reviewText) {
    res.redirect('/location/' + locationId + '/reviews/new?error=validation');
  } else {
    request(requestOptions, function (err, response, body) {
      if (response.statusCode === 201) {
        res.redirect('/location/' + locationId);
      } else if (response.statusCode === 400 && body.name && body.name === 'ValidationError') {
        res.redirect('/location/' + locationId + '/reviews/new?error=validation');
      } else {
        console.log(body);
        _showError(req, res, response.statusCode);
      }
    });
  }
};
