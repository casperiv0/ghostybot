const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "hboobs",
  description: "None",
  category: "hentainsfw",
  nsfwOnly: true,
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);

    const data = await fetch(
      "https://nekobot.xyz/api/image?type=hboobs"
    ).then((res) => res.json());

    const embed = BaseEmbed(message)
      .setDescription(
        `${lang.IMAGE.CLICK_TO_VIEW}(${data.message})`
      )
      .setImage(`${data.message}`);

    message.channel.send(embed);
  },
};
