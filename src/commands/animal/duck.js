const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "duck",
  description: "Shows a picture of a duck",
  category: "animal",
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const data = await fetch(
      "https://random-d.uk/api/v1/random?type=gif"
    ).then((res) => res.json());

    const embed = BaseEmbed(message)
      .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.url})`)
      .setImage(`${data.url}`);

    message.channel.send(embed);
  },
};
