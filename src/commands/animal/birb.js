const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "birb",
  description: "Shows a picture of a birb",
  category: "animal",
  async execute(bot, message) {
    const data = await fetch("https://api.alexflipnote.dev/birb").then((res) =>
      res.json()
    );

    const embed = new MessageEmbed()
      .setFooter(message.author.username)
      .setColor("BLUE")
      .setDescription(
        `[Click here if the image failed to load.](${data.file})`
      )
      .setImage(`${data.file}`)
      .setTimestamp();

    message.channel.send(embed);
  },
};
