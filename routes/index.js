var express = require('express');
var router = express.Router();
var sonarEmailParser = require('../lib/sonarEmailParser');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/cloudmailin', function(req, res, next) {
  var subject = req.body.headers.Subject;
  var body = req.body.html;

  var msg = sonarEmailParser.parse(subject, body);

  res.send(msg);
});

module.exports = router;
