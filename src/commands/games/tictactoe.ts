import { Message } from "discord.js";
import { tictactoe as TicTacToe } from "easy-games-js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class TicTacToeCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "tictactoe",
      description: "Play a game of tictactoe",
      category: "games",
      requiredArgs: [{ name: "member" }],
      aliases: ["ttt", "tttoe"],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const member = await bot.utils.findMember(message, args);
      const ticTacToe = new TicTacToe(member, message);

      ticTacToe.init(lang.EASY_GAMES);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
