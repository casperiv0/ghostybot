const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "smug",
  description: "Smug",
  category: "image",
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const data = await fetch("https://nekos.life/api/v2/img/smug").then((res) =>
      res.json()
    );

    const embed = BaseEmbed(message)
      .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.url})`)
      .setImage(`${data.url}`);

    message.channel.send({ embed });
  },
};
