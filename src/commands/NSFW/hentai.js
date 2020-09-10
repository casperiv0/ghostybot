const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "hentai",
  category: "nsfw",
  description: "None",
  async execute(bot, message) {
    if (!message.channel.nsfw)
      return message.channel.send("This channel is not a NSFW channel!");

    const data = await bot.neko.nsfw.randomHentaiGif();

    const embed = new MessageEmbed()
      .setFooter(message.author.username)
      .setColor("BLUE")
      .setDescription(`[Click here if the image failed to load.](${data.url})`)
      .setImage(`${data.url}`)
      .setTimestamp();

    message.channel.send({ embed });
  },
};
