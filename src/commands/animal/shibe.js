const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "shibe",
  description: "Returns an image of a shibe",
  category: "animal",
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const data = await fetch("http://shibe.online/api/shibes").then((res) =>
      res.json()
    );

    const embed = BaseEmbed()
      .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data[0]})`)
      .setImage(`${data[0]}`);

    message.channel.send(embed);
  },
};
