const answers = require("../../data/8ball.json");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "8ball",
  description: "8Ball",
  category: "games",
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const question = args.join(" ");

    if (!question) {
      return message.channel.send(lang.GLOBAL.PROVIDE_ARGS);
    }

    const answer = answers[Math.floor(Math.random() * answers.length)];

    const embed = BaseEmbed(message)
      .setTitle("8Ball")
      .addField(`${lang.GAMES.QUESTION}:`, question)
      .addField(`${lang.GAMES.ANSWER}:`, answer);

    message.channel.send(embed);
  },
};
