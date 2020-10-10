const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "spank",
  category: "nsfw",
  usage: "None",
  async execute(bot, message) {
    if (!message.channel.nsfw) {
      return message.channel.send("This channel is not a NSFW channel!");
    }

    const data = await bot.neko.nsfw.spank();

    const blowjob = new MessageEmbed()
      .setTitle("Spank")
      .setImage(data.url)
      .setColor("BLUE")
      .setURL(data.url);
    message.channel.send(blowjob);
  },
};
