var express = require('express');
var router = express.Router();
var Slackbot = require('slackbot');
var sonarEmailParser = require('../lib/sonarEmailParser');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sonar Slack Integration Ready' });
});

router.post('/cloudmailin', function(req, res, next) {
  var subject = req.body.headers.Subject;
  var body = req.body.html;

  var msg = sonarEmailParser.parse(subject, body);

  var slackbot = new Slackbot(process.env.SLACK_TEAM, process.env.SLACKBOT_TOKEN);
  var channel = process.env.SLACK_CHANNEL || '#general';
  var slackMessage = '*' + msg.sender + '*: ' + msg.body + '\nReply at https://www.sendsonar.com/';
  console.log('sending slackbot message', slackMessage);
  slackbot.send(channel, slackMessage, function(err, slackres, body) {
    if (err) {
      console.error('slackbot send failed', err);
      res.status(500).end();
      return;
    }

    res.send(msg);
  });
});

module.exports = router;
