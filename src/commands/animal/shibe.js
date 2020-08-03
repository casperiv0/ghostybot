const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "shibe",
  description: "Returns an image of a shibe",
  category: "animal",
  async execute(bot, message) {
    const data = await fetch("http://shibe.online/api/shibes").then((res) =>
      res.json()
    );

    const embed = new MessageEmbed()
      .setFooter(message.author.username)
      .setColor("BLUE")
      .setDescription(`[Click here if the image failed to load.](${data[0]})`)
      .setImage(`${data[0]}`)
      .setTimestamp();

    message.channel.send(embed);
  },
};
