const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "iq",
  description: "Get a random Iq returned",
  category: "games",
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);

    const iq = Math.floor(Math.random() * 100) + 1;

    const embed = BaseEmbed(message)
      .setTitle(lang.GAMES.IQ_TEST)
      .setDescription(lang.GAMES.IQ_IS.replace("{iq}", iq));

    message.channel.send(embed);
  },
};
