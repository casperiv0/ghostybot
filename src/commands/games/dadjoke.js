const fetch = require("node-fetch");

module.exports = {
  name: "dadjoke",
  description: "Shows a dadjoke",
  category: "games",
  async execute(bot, message) {
    const data = await fetch("https://icanhazdadjoke.com/slack").then((res) =>
      res.json()
    );

    message.channel.send(data.attachments[0].fallback);
  },
};
