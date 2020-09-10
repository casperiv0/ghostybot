const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "cuddle",
  description: "Cuddle with somebody",
  category: "image",
  async execute(bot, message, args) {
    const data = await bot.neko.sfw.cuddle();

    const user = message.mentions.users.first() || message.author;
    const cuddled = message.author.id === user.id ? "themselfs" : user.username;

    const embed = new MessageEmbed()
      .setTitle(`${message.author.username} Cuddles with ${cuddled}`)
      .setFooter(message.author.username)
      .setColor("BLUE")
      .setDescription(`[Click here if the image failed to load.](${data.url})`)
      .setImage(`${data.url}`)
      .setTimestamp();

    message.channel.send(embed);
  },
};
