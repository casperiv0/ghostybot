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
      requiredArgs: ["time", "winnerCount", "prize"],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    // const lang = await bot.utils.getGuildLang(message.guild?.id)
    const [time, winnerCount, ...rest] = args;
    const prize = rest.join(" ");

    if (!time) {
      return message.channel.send("Please provide an end time");
    }

    if (!winnerCount) {
      return message.channel.send("Please provide a winner count");
    }

    if (!prize) {
      return message.channel.send("Please provide a prize");
    }

    bot.giveawayManager.start(message.channel as TextChannel, {
      time: ms(time),
      prize: prize,
      winnerCount: Number(winnerCount),
      messages: {
        giveaway: "**🎉🎉 New Giveaway 🎉🎉**",
        giveawayEnded: "**GIVEAWAY ENDED**",
      },
    });
  }
}
