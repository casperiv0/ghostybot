const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "bear",
  description: "Shows a random picture of bear and fact",
  category: "animal",
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);

    const data = await fetch(
      "https://no-api-key.com/api/v1/animals/bear"
    ).then((res) => res.json());

    const embed = BaseEmbed(message)
      .setTitle(`${data.fact}`)
      .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.image})`)
      .setImage(`${data.image}`);

    message.channel.send(embed);
  },
};
