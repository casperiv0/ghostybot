const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "feed",
  description: "feed somebody",
  category: "image",
  async execute(bot, message) {
    const data = await bot.neko.sfw.feed();

    const user = message.mentions.users.first() || message.author;
    const feeding = message.author.id === user.id ? "themselfs" : user.username;

    const embed = BaseEmbed(message)
      .setTitle(`${message.author.username} feeded ${feeding}`)
      .setDescription(`[Click here if the image failed to load.](${data.url})`)
      .setImage(`${data.url}`);

    message.channel.send(embed);
  },
};
