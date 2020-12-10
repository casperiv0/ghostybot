const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "rps",
  description: "Rock Paper Scissors",
  category: "games",
  usage: "rps <rock | paper | scissors>",
  requiredArgs: ["input"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const [input] = args;

    if (!input) {
      return message.channel.send(lang.GLOBAL.PROVIDE_ARGS + " <rock | paper | scissors>");
    }

    let hasWon = false;

    const replies = [lang.GAMES.ROCK, lang.GAMES.PAPER, lang.GAMES.SCISSORS];
    const reply = replies[Math.floor(Math.random() * replies.length)];

    if (input.toLowerCase() === reply.toLowerCase()) {
      hasWon = true;
      const { user } = await bot.getUserById(message.author.id, message.guild.id);
      await bot.updateUserById(message.author.id, message.guild.id, {
        money: user.money + 50,
      });
    }

    const embed = BaseEmbed(message)
      .setTitle(lang.GAMES.RPS)
      .setDescription(`**${reply}**`)
      .addField("Winner:", hasWon ? lang.GAMES.YOU_WON : lang.GAMES.BOT_WON);

    message.channel.send(embed);
  },
};
