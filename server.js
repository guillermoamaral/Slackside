require("dotenv").config();
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
const BACKEND_URL = process.env.BACKEND_URL;
const PORT = process.env.PORT || 3000;

app.post("/slack/events", async (req, res) => {
	const body = req.body;

	// Handle Slack URL verification challenge
	if (body.type === "url_verification") {
		return res.status(200).send(body.challenge);
	}

	const event = body.event;

	if (event && event.type === "message" && !event.bot_id) {
		const expression = event.text;
		try {
			const response = await axios.post(
				BACKEND_URL,
				{
					expression: expression,
					sync: true,
				},
				{
					headers: { Accept: "application/json" },
				}
			);

			await axios.post(
				"https://slack.com/api/chat.postMessage",
				{
					channel: event.channel,
					text: `\`${response.data.printString}\``,
				},
				{
					headers: { Authorization: `Bearer ${SLACK_BOT_TOKEN}` },
				}
			);
		} catch (error) {
			const response = error.response;
			await axios.post(
				"https://slack.com/api/chat.postMessage",
				{
					channel: event.channel,
					text: `${response?.data?.printString}\n\n${response?.data?.stack}`,
				},
				{
					headers: { Authorization: `Bearer ${SLACK_BOT_TOKEN}` },
				}
			);
		}
	}

	res.status(200).send();
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
