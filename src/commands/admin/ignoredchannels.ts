import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class IgnoredChannelsCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "ignoredchannels",
      description: "Add/remove ignored channels",
      category: "admin",
      usage: "<option> <channel>",
      options: ["add", "remove"],
      memberPermissions: ["ADMINISTRATOR"],
      aliases: ["igch", "ic"],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    try {
      const guildId = message.guild?.id;
      const option = args[0];
      const item = message.mentions.channels.first() || message.channel;
  
      const guild = await bot.utils.getGuildById(guildId);
      if (!guild) {
        return message.channel.send(lang.GLOBAL.ERROR);
      }
  
      const ignoredChannels = guild?.ignored_channels;
  
      if (!item) {
        return message.channel.send(lang.ADMIN.PROVIDE_CHANNEL);
      }
  
      switch (option.toLowerCase()) {
        case "add":
          if (ignoredChannels?.includes(item.id)) {
            return message.channel.send(lang.ADMIN.CHANNEL_ALREADY_IGNORED);
          }
  
          await bot.utils.updateGuildById(guildId, {
            ignored_channels: [...ignoredChannels, item.id],
          });
  
          message.channel.send(lang.ADMIN.ADD_TO_IGNORE.replace("{item}", `${item}`));
          break;
        case "remove":
          if (!ignoredChannels?.includes(item.id)) {
            return message.channel.send(lang.ADMIN.CHANNEL_NOT_IGNORED);
          }
  
          await bot.utils.updateGuildById(guildId, {
            ignored_channels: ignoredChannels?.filter((ci) => ci !== item.id),
          });
  
          return message.channel.send(lang.ADMIN.REMOVE_IGNORED.replace("{item}", `${item}`));
        default:
          return message.channel.send(lang.ADMIN.NOT_A_OPTION.replace("{option}", option));
      }
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
