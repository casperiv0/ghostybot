const fetch = require("node-fetch");

module.exports = {
  name: "advice",
  description: "Gives you advice",
  category: "games",
  async execute(bot, message) {
    const data = await fetch("https://api.adviceslip.com/advice").then((res) =>
      res.json()
    );

    message.channel.send(data.slip.advice);
  },
};
