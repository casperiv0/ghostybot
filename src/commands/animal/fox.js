const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "fox",
  description: "Shows a picture of a fox",
  category: "animal",
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const data = await fetch("https://randomfox.ca/floof/").then((res) =>
      res.json()
    );

    const embed = BaseEmbed(message)
      .setDescription(
        `${lang.IMAGE.CLICK_TO_VIEW}(${data.image})`
      )
      .setImage(`${data.image}`);

    message.channel.send(embed);
  },
};
