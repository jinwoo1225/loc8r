module.exports.about = function (req, res) {
  res.render('generic-text', {
    title: 'About',
    content: 'Loc8r was created to help people find places to sit down and get a bit of work done.\n\nLacrimosa, dies illa, qua resurget ex favilla judicandus homo reus. Lacrimosa, dies illa, qua resurget ex favilla judicandus homo reus. Lacrimosa, dies illa, qua resurget ex favilla judicandus homo reus. Lacrimosa, dies illa, qua resurget ex favilla judicandus homo reus. Lacrimosa, dies illa, qua resurget ex favilla judicandus homo reus. Lacrimosa, dies illa, qua resurget ex favilla judicandus homo reus. Lacrimosa, dies illa, qua resurget ex favilla judicandus homo reus. Lacrimosa, dies illa, qua resurget ex favilla judicandus homo reus. Lacrimosa, dies illa, qua resurget ex favilla judicandus homo reus. Lacrimosa, dies illa, qua resurget ex favilla judicandus homo reus. Lacrimosa, dies illa, qua resurget ex favilla judicandus homo reus. Lacrimosa, dies illa, qua resurget ex favilla judicandus homo reus. Lacrimosa, dies illa, qua resurget ex favilla judicandus homo reus. Lacrimosa, dies illa, qua resurget ex favilla judicandus homo reus. Lacrimosa, dies illa, qua resurget ex favilla judicandus homo reus. Lacrimosa, dies illa, qua resurget ex favilla judicandus homo reus.'
  });
};

module.exports.angularApp = function (req, res) {
  res.render('layout', {title: 'Loc8r'});
};
