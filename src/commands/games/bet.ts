import { Message } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class BetCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "bet",
      description: "Bet on somebody",
      category: "games",
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const member = await this.bot.utils.findMember(message, args);

      if (!member) {
        return message.reply(lang.EASY_GAMES.PROVIDE_MEMBER);
      }

      const number = Math.random();

      const embed = this.bot.utils
        .baseEmbed(message)
        .setTitle(
          lang.GAMES.BETS_ON.replace("{member_1}", message.author.username).replace(
            "{member_2}",
            member.user.username,
          ),
        )
        .setDescription(
          number > 0.5
            ? lang.GAMES.WON_BET.replace("{member_1}", message.author.username)
                .replace("{member_2}", member.user.username)
                .replace("{member_1}", message.author.username)
            : lang.GAMES.LOST_BET.replace("{member_1}", message.author.username)
                .replace("{member_2}", member.user.username)
                .replace("{member_1}", message.author.username),
        );

      return message.channel.send({ embeds: [embed] });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
