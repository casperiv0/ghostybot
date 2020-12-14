const BaseEmbed = require("../../modules/BaseEmbed");
const { toCapitalize } = require("../../utils/functions");

module.exports = {
  name: "rps",
  description: "Rock Paper Scissors",
  category: "games",
  usage: "rps <rock | paper | scissors>",
  requiredArgs: ["rock | paper | scissors"],
  cooldown: 5,
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const input = args.join("").toLowerCase();

    const replies = [lang.GAMES.ROCK, lang.GAMES.PAPER, lang.GAMES.SCISSORS];
    const inp = replies.find((r) => r.toLowerCase() === input);

    if (!inp) {
      return message.channel.send(`${lang.GAMES.INVALID_INPUT} <rock | paper | scissors>`);
    }

    const reply = replies[Math.floor(Math.random() * replies.length)];

    const hasWon = checkWon(inp.toLowerCase(), reply.toLowerCase());
    if (hasWon === true) {
      const { user } = await bot.getUserById(message.author.id, message.guild.id);
      await bot.updateUserById(message.author.id, message.guild.id, {
        money: user.money + 50,
      });
    }

    const winner =
      hasWon === true
        ? lang.GAMES.YOU_WON
        : hasWon === 0
        ? lang.GAMES.BOTH_WON
        : lang.GAMES.BOT_WON;

    const embed = BaseEmbed(message)
      .setTitle(lang.GAMES.RPS)
      .setDescription(`**${lang.GAMES.WINNER}:** ${winner}`)
      .addField(lang.GAMES.YOUR_CHOICE, toCapitalize(input))
      .addField(lang.GAMES.OPPONENTS_CHOICE, reply);

    message.channel.send(embed);
  },
};

function checkWon(input, reply) {
  const isRock = (v) => v === "rock";
  const isPaper = (v) => v === "paper";
  const isScissors = (v) => v === "scissors";

  const IWon =
    (isRock(input) && isScissors(reply)) /* 'Rock' wins over 'Scissors'  */ ||
    (isPaper(input) && isRock(reply)) /* 'Paper' wins over 'Rock' */ ||
    (isScissors(input) && isPaper(reply)); /* 'Scissors' wins over 'Paper' */

  if (IWon) {
    return true;
  } else if (input === reply) {
    return 0;
  } else {
    return false;
  }
}
