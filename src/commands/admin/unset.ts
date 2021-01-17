import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class UnSetCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "unset",
      category: "admin",
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    return message.channel.send(
      lang.ADMIN.SET_CMD.replace("{url}", bot.config.dashboard.dashboardUrl)
    );
  }
}
