import { Message } from "discord.js";
import dayJs from "dayjs";
import duration from "dayjs/plugin/duration";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";
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
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);

    const uptime = dayJs
      .duration(this.bot?.uptime ?? 0)
      .format(" D [days], H [hrs], m [mins], s [secs]");

    return message.channel.send(
      lang.UTIL.UPTIME.replace("{member}", `${this.bot.user?.username}`).replace("{time}", uptime),
    );
  }
}
