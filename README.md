# Sonar Slack Integration
This app posts new [Sonar](http://www.sendsonar.com/) messages to Slack,
because nobody likes email.

## Setup
1. [Add Incoming WebHooks](https://minder.slack.com/services/new/incoming-webhook) to your Slack.
2. Create a [Cloudmailin](http://www.cloudmailin.com/) account
   and configure it to send JSON to a postbin somewhere.
3. Add a user to your Sonar account using your Cloudmailin email address.
4. Verify the email address and create the new Sonar user
   by following the link that was sent to your postbin.
5. Deploy this app to [Heroku](http://www.heroku.com/): [![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/idris/sonar-slack)
6. Edit your Cloudmailin settings and change the URL to `http://<YOUR_HEROKU_URL>/cloudmailin`.

## Configuration
Several environment variables (listed below) are required to run the app.
If you use the "Deploy to Heroku" button above, you will be prompted for them.

| Environment Variable | Value | Default |
|----------------------|-------|---------|
| SLACK_INCOMING_WEBHOOK_URL | Slack Incoming WebHook URL | |
| SLACK_CHANNEL | Slack channel to post in. If not specified, it'll use the channel you specified when setting up incoming the webhooks integration in slack. |  |
| SLACK_USERNAME | Username that the messages will come from. | Sonar |
