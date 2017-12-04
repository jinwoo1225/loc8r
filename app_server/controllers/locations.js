/* module.exports.home = function (req, res) {
  res.render('index', {title: 'Home'});
}; */

module.exports.homeList = function (req, res) {
  res.render('locations-list', {title: 'Home'});
};

module.exports.locationInfo = function (req, res) {
  res.render('location-info', {title: 'Location Info'});
};

module.exports.addReview = function (req, res) {
  res.render('location-review-form', {title: 'Add Review'});
};

module.exports.about = function (req, res) {
  res.render('generic-text', {title: 'Add Review'});
};
