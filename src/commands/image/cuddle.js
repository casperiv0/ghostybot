const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "cuddle",
  description: "Cuddle with somebody",
  category: "image",
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const data = await bot.neko.sfw.cuddle();

    const user = message.mentions.users.first() || message.author;
    const cuddled = message.author.id === user.id ? "themselfs" : user.username;

    const embed = BaseEmbed(message)
      .setTitle(
        `${message.author.username} ${lang.IMAGE.CUDDLES} ${cuddled}`
      )
      .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.url})`)
      .setImage(`${data.url}`);

    message.channel.send(embed);
  },
};
