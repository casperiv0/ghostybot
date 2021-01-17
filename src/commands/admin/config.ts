import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class ConfigCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "config",
      description: "Returns the config",
      category: "exempt",
      aliases: ["conf", "cfg"],
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      if (!message.guild) return;
  
      const { name, id: guildId } = message.guild;
      const guild = await bot.utils.getGuildById(guildId);
  
      const prefix = guild?.prefix;
      const announceCh = guild?.announcement_channel;
      const suggestCh = guild?.suggest_channel;
      const welcomeCh = guild?.welcome_data?.channel_id;
      const leaveCh = guild?.leave_data?.channel_id;
      const levelMsgs = guild?.level_data?.enabled;
  
      const embed = bot.utils
        .baseEmbed(message)
        .setTitle(lang.ADMIN.GUILD_CONFIG.replace("{guildName}", name))
        .addField(lang.GUILD.PREFIX, prefix)
        .addField(lang.GUILD.ANNOUNCE_CHANNEL, !announceCh ? lang.GLOBAL.NONE : `<#${announceCh}>`)
        .addField(lang.GUILD.SUGGEST_CHANNEL, !suggestCh ? lang.GLOBAL.NONE : `<#${suggestCh}>`)
        .addField(lang.GUILD.WELCOME_CHANNEL, !welcomeCh ? lang.GLOBAL.NONE : `<#${welcomeCh}>`)
        .addField(lang.GUILD.LEAVE_CHANNEL, !leaveCh ? lang.GLOBAL.NONE : `<#${leaveCh}>`)
        .addField(lang.GUILD.LEVEL_UP_MESSAGES, levelMsgs);
  
      message.channel.send({ embed });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
