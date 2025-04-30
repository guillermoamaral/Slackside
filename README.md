# Slack Webside Bot

Slack bot for communicating to Smalltalk via Webside API.

Note: This is just a POC aimed at exploring the usage of [Webside](https://github.com/guillermoamaral/Webside) API.

![Slackside Demo](assets/demo.gif)

## Installation

```bash
npm install
```

## Usage

To start the server:

```bash
npm start
```

The server will listen by default on port `3000`. You can configure a different port by setting the `PORT` environment variable:

```bash
export PORT=4000
npm start
```

## Slack Setup

### 1. Create a Slack App

-   Go to [Slack API: Create New App](https://api.slack.com/apps).
-   Choose **From scratch** and name your app (e.g., `Slackside`).
-   Under **OAuth & Permissions**, add these Bot Token Scopes:
    -   `chat:write`
    -   `channels:read`
    -   `groups:read`
    -   `channels:join`
-   Install the app and copy your **Bot User OAuth Token**.

### 2. Create a Slack Channel

-   In Slack, create a new channel (e.g., `#Smalltalk`).
-   Invite your bot with:

```bash
/invite @Slackside
```

### 3. Configure Slackside

Set the following environment variable:

```bash
export SLACK_BOT_TOKEN=xoxb-your-bot-token
```

If you want Slack to send events to your server (e.g., messages or commands), you must expose your server with a public URL and configure it in your Slack App.

Example using [ngrok](https://ngrok.com/):

```bash
ngrok http 3000
```

Then, in your Slack App settings (**Event Subscriptions**), set the Request URL to:

```
https://your-ngrok-id.ngrok.io/slack/events
```

(Replace `your-ngrok-id` with your actual URL.)

### 4. Run Slackside

Start the Slackside server.  
The bot will connect automatically to your Slack channel.
