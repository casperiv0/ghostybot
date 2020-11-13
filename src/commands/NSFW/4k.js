const BaseEmbed = require("../../modules/BaseEmbed");
const fetch = require("node-fetch");

module.exports = {
  name: "4k",
  description: "None",
  category: "nsfw",
  nsfwOnly: true,
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const data = await fetch(
      "https://nekobot.xyz/api/image?type=4k"
    ).then((res) => res.json());

    const embed = BaseEmbed(message)
      .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.message})`)
      .setImage(`${data.message}`);

    message.channel.send(embed);
  },
};
