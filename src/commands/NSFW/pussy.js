const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "pussy",
  description: "None",
  category: "nsfw",
  async execute(bot, message) {
    const data = await bot.neko.nsfw.pussy();

    const blowjob = new MessageEmbed()
      .setTitle("Blowjob")
      .setImage(data.url)
      .setColor("BLUE")
      .setURL(data.url);
    message.channel.send(blowjob);
  },
};
