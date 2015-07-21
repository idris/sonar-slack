var fs = require('fs');
var cheerio = require('cheerio');

exports.parse = function(subject, emailBody) {
  var sender = subject.match(/New Message from (.*)/i)[1];
  var $ = cheerio.load(emailBody);
  var body = $('table tbody table tbody td p em').text().trim();
  body = body.match(/^"([\s\S]*)"$/)[1];

  return {
    sender: sender,
    body: body
  };
};
