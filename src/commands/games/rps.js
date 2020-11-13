const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "rps",
  description: "Rock Paper Scissors",
  category: "games",
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);

    const replies = [
      lang.GAMES.ROCK,
      lang.GAMES.PAPER,
      lang.GAMES.SCISSORS,
    ];

    const reply = replies[Math.floor(Math.random() * replies.length)];

    const embed = BaseEmbed(message)
      .setTitle(lang.GAMES.RPS)
      .setDescription(`**${reply}**`);

    message.channel.send(embed);
  },
};
