const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "blowjob",
  category: "nsfw",
  usage: "None",
  async execute(bot, message) {
    if (!message.channel.nsfw) {
      return message.channel.send("This channel is not a NSFW channel!");
    }

    const data = await bot.neko.nsfw.blowJob();

    const blowjob = new MessageEmbed()
      .setTitle("Blowjob")
      .setImage(data.url)
      .setColor("BLUE")
      .setURL(data.url);
    message.channel.send(blowjob);
  },
};
