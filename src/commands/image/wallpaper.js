const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "wallpaper",
  description: "good wallpapers xD",
  category: "image",
  async execute(bot, message) {
    const data = await bot.neko.sfw.wallpaper();

    const embed = new MessageEmbed()
      .setTitle("OOO a wallpaper nice")
      .setImage(data.url);

    message.channel.send(embed);
  },
};
