const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "cuddle",
  description: "Cuddle with somebody",
  category: "image",
  async execute(bot, message) {
    const data = await bot.neko.sfw.cuddle();

    const user = message.mentions.users.first() || message.author;
    const cuddled = message.author.id === user.id ? "themselfs" : user.username;

    const embed = BaseEmbed(message)
      .setTitle(`${message.author.username} Cuddles with ${cuddled}`)
      .setDescription(`[Click here if the image failed to load.](${data.url})`)
      .setImage(`${data.url}`);

    message.channel.send(embed);
  },
};
