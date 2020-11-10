const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "feed",
  description: "feed somebody",
  category: "image",
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const data = await bot.neko.sfw.feed();

    const user = message.mentions.users.first() || message.author;
    const feeding = message.author.id === user.id ? "themselfs" : user.username;

    const embed = BaseEmbed(message)
      .setTitle(
        `${message.author.username} ${lang.IMAGE.FEEDED} ${feeding}`
      )
      .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.url})`)
      .setImage(`${data.url}`);

    message.channel.send(embed);
  },
};
