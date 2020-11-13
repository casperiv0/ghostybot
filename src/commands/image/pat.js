const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "pat",
  description: "Pat somebody",
  category: "image",
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const data = await fetch("https://nekos.life/api/v2/img/pat").then((res) =>
      res.json()
    );
    const user = message.mentions.users.first() || message.author;
    const patted = message.author.id === user.id ? "themselfs" : user.username;

    const embed = BaseEmbed(message)
      .setTitle(`${message.author.username} ${lang.IMAGE.PATTED} ${patted}`)
      .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.url})`)
      .setImage(`${data.url}`);

    message.channel.send({ embed });
  },
};
