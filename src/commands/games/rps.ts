import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class RockPaperScissorsCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "rps",
      description: "Rock Paper Scissors",
      category: "games",
      usage: "<rock | paper | scissors>",
      requiredArgs: [{ name: "rock | paper | scissors" }],
      cooldown: 5,
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const input = args.join("").toLowerCase();

      const replies = [lang.GAMES.ROCK, lang.GAMES.PAPER, lang.GAMES.SCISSORS];
      const inp = replies.find((r) => r.toLowerCase() === input);

      if (!inp) {
        return message.channel.send(`${lang.GAMES.INVALID_INPUT} <rock | paper | scissors>`);
      }

      const reply = replies[Math.floor(Math.random() * replies.length)];

      const hasWon = this.checkWon(inp.toLowerCase(), reply.toLowerCase());
      if (hasWon === true) {
        const user = await bot.utils.getUserById(message.author.id, message.guild?.id);
        if (!user) {
          return message.channel.send(lang.GLOBAL.ERROR);
        }
        await bot.utils.updateUserById(message.author.id, message.guild?.id, {
          money: user.money + 50,
        });
      }

      const winner =
        hasWon === true
          ? lang.GAMES.YOU_WON
          : hasWon === 0
          ? lang.GAMES.BOTH_WON
          : lang.GAMES.BOT_WON;

      const embed = bot.utils
        .baseEmbed(message)
        .setTitle(lang.GAMES.RPS)
        .setDescription(`**${lang.GAMES.WINNER}:** ${winner}`)
        .addField(lang.GAMES.YOUR_CHOICE, bot.utils.toCapitalize(input))
        .addField(lang.GAMES.OPPONENTS_CHOICE, reply);

      message.channel.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }

  checkWon(input: string, reply: string) {
    const isRock = (v: string) => v === "rock";
    const isPaper = (v: string) => v === "paper";
    const isScissors = (v: string) => v === "scissors";

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
}
