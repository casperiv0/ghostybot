import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class LeaveGuildCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "leaveguild",
      description: "Leaves a guid by the provided Id",
      category: "botowner",
      ownerOnly: true,
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    const guildId = args[0];

    if (!guildId) {
      return message.channel.send("Please provide an id");
    }

    const guild = bot.guilds.cache.find((g) => g.id === guildId);

    if (!guild) {
      return message.channel.send(lang.GUILD.NOT_FOUND);
    }

    try {
      await guild.leave();
      message.channel.send(lang.GUILD.LEFT.replace("{guild_name}", guild.name));
    } catch (e) {
      bot.utils.sendErrorLog(e, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
