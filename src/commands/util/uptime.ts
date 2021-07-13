import { Message } from "discord.js";
import dayJs from "dayjs";
import duration from "dayjs/plugin/duration";
import Command from "structures/Command";
import Bot from "structures/Bot";
import { time } from "@discordjs/builders";
dayJs.extend(duration);

export default class UptimeCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "uptime",
      description: "Returns the uptime of the bot",
      category: "util",
      aliases: ["up"],
    });
  }

  async execute(message: Message) {
    const uptimeRelative = dayJs.duration(this.bot?.uptime ?? 0).format("H [hrs]");
    const botUpSince = time(new Date(Date.now() - (this.bot.uptime ?? 0)), "f");

    return message.channel.send({
      content: `Bot has been up since: ${botUpSince} (${uptimeRelative})`,
    });
  }
}
