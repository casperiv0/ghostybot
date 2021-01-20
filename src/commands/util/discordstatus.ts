import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

const STATUS_URL = "https://discordstatus.com/api/v2/status.json";

export default class DiscordStatusCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "discordstatus",
      description: "Returns the current status of Discord",
      category: "util",
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    try {
      const status = await fetch(STATUS_URL).then((res) => res.json());
      const { date, tz } = await bot.utils.formatDate(status.page.updated_at, message.guild?.id);

      const embed = bot.utils
        .baseEmbed(message)
        .addField("Status", status.status.description)
        .setFooter(`${date} (${tz})`, message.author.displayAvatarURL({ dynamic: true }));

      return message.channel.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
