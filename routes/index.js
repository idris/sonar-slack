var express = require('express');
var router = express.Router();
var Slackbot = require('slackbot');
var sonarEmailParser = require('../lib/sonarEmailParser');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/cloudmailin', function(req, res, next) {
  var subject = req.body.headers.Subject;
  var body = req.body.html;

  var msg = sonarEmailParser.parse(subject, body);

  var slackbot = new Slackbot(process.env.SLACK_TEAM, process.env.SLACKBOT_TOKEN);
  var channel = process.env.SLACK_CHANNEL || '#general';
  var slackMessage = '*' + sender + '*: ' + body + '\nReply at https://www.sendsonar.com/';
  slackbot.send(channel, slackMessage, function(err, res, body) {
    if (err) {
      console.log('slackbot send failed', err, res, body);
      res.status(500).end();
      return;
    }

    res.send(msg);
  });
});

module.exports = router;
