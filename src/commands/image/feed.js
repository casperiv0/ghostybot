const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "feed",
  description: "feed somebody",
  category: "image",
  async execute(bot, message) {
    const data = await bot.neko.sfw.feed();

    const user = message.mentions.users.first() || message.author;
    const feeding = message.author.id === user.id ? "themselfs" : user.username;

    const embed = new MessageEmbed()
      .setTitle(`${message.author.username} feeded ${feeding}`)
      .setFooter(message.author.username)
      .setColor("BLUE")
      .setDescription(`[Click here if the image failed to load.](${data.url})`)
      .setImage(`${data.url}`)
      .setTimestamp();

    message.channel.send(embed);
  },
};
