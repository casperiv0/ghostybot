import { Message } from "discord.js";
import moment from "moment";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class UptimeCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "uptime",
      description: "Returns the uptime of the bot",
      category: "util",
      aliases: ["up"],
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    const uptime = (moment.duration(bot.uptime) as any).format(
      " D [days], H [hrs], m [mins], s [secs]"
    );

    return message.channel.send(
      lang.UTIL.UPTIME.replace("{member}", `${bot.user?.username}`).replace("{time}", uptime)
    );
  }
}
