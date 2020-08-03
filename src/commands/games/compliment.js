const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "compliment",
  description: "Get a compliment",
  category: "games",
  async execute(bot, message) {
    const { compliment } = await fetch(
      "https://complimentr.com/api"
    ).then((res) => res.json());

    const embed = new MessageEmbed()
      .setTitle("New Compliment")
      .setDescription(compliment)
      .setColor("BLUE")
      .setFooter(message.author.username)
      .setTimestamp();

    message.channel.send(embed);
  },
};
