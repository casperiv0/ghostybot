const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "hass",
  description: "None",
  category: "hentainsfw",
  async execute(bot, message) {
    if (!message.channel.nsfw)
      return message.channel.send("This channel is not a NSFW channel!");
    const data = await fetch(
      "https://nekobot.xyz/api/image?type=hass"
    ).then((res) => res.json());
    const embed = new MessageEmbed()
      .setFooter(message.author.username)
      .setColor("BLUE")
      .setDescription(
        `[Click here if the image failed to load.](${data.message})`
      )
      .setImage(`${data.message}`)
      .setTimestamp();

    message.channel.send(embed);
  },
};
