const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "bear",
  description: "Shows a random picture of bear",
  category: "animal",
  async execute(bot, message) {
    const data = await fetch("https://no-api-key.com/api/v1/animals/bear").then((res) =>
      res.json()
    );

    const embed = new MessageEmbed()
      .setFooter(message.author.username)
      .setColor("BLUE")
      .setDescription(
        `[Click here if the image failed to load.](${data.link})`
      )
      .setImage(`${data.link}`)
      .setTimestamp();

    message.channel.send(embed);
  },
};
