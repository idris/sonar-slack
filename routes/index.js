var express = require('express');
var router = express.Router();
var Slack = require('node-slack');
var sonarEmailParser = require('../lib/sonarEmailParser');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sonar Slack Integration Ready' });
});

router.post('/cloudmailin', function(req, res, next) {
  var subject = req.body.headers.Subject;
  var body = req.body.html;

  var msg = sonarEmailParser.parse(subject, body);
  var slackMessage = msg.body + '\n<' + msg.link + '|' + Reply via Sonar + '>';

  var slack = new Slack(process.env.SLACK_INCOMING_WEBHOOK_URL);
  var sendOptions = {
    username: (process.env.SLACK_USERNAME || 'Sonar') + ': ' + msg.sender,
    text: slackMessage,
    icon_url: 'https://raw.githubusercontent.com/idris/sonar-slack/master/public/images/sonar-logo-square.png',
    unfurl_links: false
  };
  if (process.env.SLACK_CHANNEL) {
    sendOptions.channel = process.env.SLACK_CHANNEL;
  }

  slack.send(sendOptions);

  res.send(msg);
});

module.exports = router;
