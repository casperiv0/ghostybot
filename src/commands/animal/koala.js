const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "koala",
  description: "Shows a random picture of koala",
  category: "animal",
  async execute(bot, message) {
    const data = await fetch(
      "https://some-random-api.ml/img/koala"
    ).then((res) => res.json());

    const embed = new MessageEmbed()
      .setFooter(message.author.username)
      .setColor("BLUE")
      .setDescription(`[Click here if the image failed to load.](${data.link})`)
      .setImage(`${data.link}`)
      .setTimestamp();

    message.channel.send(embed);
  },
};
