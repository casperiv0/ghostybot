import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class ShutdownCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "shutdown",
      description: "Shuts the bot down",
      category: "botowner",
      ownerOnly: true,
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    await message.channel.send(lang.BOT_OWNER.SHUTDOWN);
    process.exit(1);
  }
}
