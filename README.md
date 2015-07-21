# Sonar Slack Integration
This app posts new [Sonar](http://www.sendsonar.com/) messages to Slack,
because nobody likes email.

## Setup
1. Create a [Cloudmailin](http://www.cloudmailin.com/) account
   and configure it to send JSON to a postbin somewhere.
2. Add a user to your Sonar account using your Cloudmailin email address.
3. Verify the email address and create the new Sonar user
   by following the link that was sent to your postbin.
4. Create a [Heroku](http://www.heroku.com/) app.
5. Edit your Cloudmailin settings and change the URL to `http://<YOUR_HEROKU_URL>/cloudmailin`.
6. [Add Slackbot integration](https://minder.slack.com/services/new/slackbot) to your Slack.
7. Configure and deploy this app.

## Configuration
Several environment variables are required to run the app:

| Environment Variable | Value | Default |
|----------------------|-------|---------|
| SLACK_TEAM | Your Slack team's subdomain (without the `.slack.com`) | |
| SLACK_CHANNEL | Slack channel to post to | #general |
| SLACKBOT_TOKEN | Slackbot integration token | |
