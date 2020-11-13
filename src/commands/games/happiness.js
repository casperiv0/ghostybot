const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "happiness",
  description: "Get a happiness returned",
  category: "games",
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);

    const happiness = Math.floor(Math.random() * 100) + 1;

    const embed = BaseEmbed(message)
      .setTitle(lang.GAMES.HAPPINESS)
      .setDescription(`${happiness}%`);

    message.channel.send(embed);
  },
};
