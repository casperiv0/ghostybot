const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "bear",
  description: "Shows a random picture of bear and fact",
  category: "animal",
  async execute(bot, message) {
    const data = await fetch("https://no-api-key.com/api/v1/animals/bear").then((res) =>
      res.json()
    );

    const embed = new MessageEmbed()
      .setFooter(message.author.username)
      .setColor("BLUE")
     .setTitle(`${data.fact}`)
      .setDescription(
        `[Click here if the image failed to load.](${data.image})`
      )
      .setImage(`${data.image}`)
      .setTimestamp();

    message.channel.send(embed);
  },
};
