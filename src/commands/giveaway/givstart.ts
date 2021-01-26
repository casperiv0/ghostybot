import { Message, TextChannel } from "discord.js";
import ms from "ms";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class GivStartCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "givstart",
      description: "Starts a giveaway",
      category: "giveaway",
      usage: "<time> <winner count> <price>\n **Example:** !givstart 2d 10 Discord nitro",
      memberPermissions: ["MANAGE_GUILD"],
      aliases: ["gstart"],
      requiredArgs: [
        { name: "time", type: "time" },
        { name: "winnerCount", type: "number" },
        { name: "prize" },
      ],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const [time, winnerCount, ...rest] = args;
      const prize = rest.join(" ");

      bot.giveawayManager.start(message.channel as TextChannel, {
        time: ms(time),
        prize: prize,
        winnerCount: +winnerCount,
        messages: {
          giveaway: "**🎉🎉 New Giveaway 🎉🎉**",
          giveawayEnded: "**GIVEAWAY ENDED**",
        },
      });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
