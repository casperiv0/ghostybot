const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "wyr",
  description: "Would you rather",
  category: "games",
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);

    const replies = require("../../data/wouldYouRather.json");

    const reply = replies[Math.floor(Math.random() * replies.length)];

    const embed = BaseEmbed(message)
      .setTitle(lang.GAMES.WYR)
      .setDescription(`**${reply}**`);

    message.channel.send(embed);
  },
};
