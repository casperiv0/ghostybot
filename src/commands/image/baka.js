const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "baka",
  description: "None",
  category: "image",
  async execute(bot, message, args) {
    const data = await bot.neko.sfw.baka();

    const embed = new MessageEmbed()
      .setFooter(message.author.username)
      .setColor("BLUE")
      .setDescription(`[Click here if the image failed to load.](${data.url})`)
      .setImage(`${data.url}`)
      .setTimestamp();

    message.channel.send(embed);
  },
};
