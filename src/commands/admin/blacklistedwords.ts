import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class BlacklistedWordsCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "blacklistedwords",
      description: "Add/remove blacklisted words",
      category: "admin",
      usage: "<option> [word]",
      options: ["get", "add", "remove"],
      memberPermissions: ["ADMINISTRATOR"],
      aliases: ["wordsfilter", "filterwords", "blacklistedword"],
      requiredArgs: [{ name: "option" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const [option, item] = args;
      const guildId = message.guild?.id;
      const guild = await bot.utils.getGuildById(guildId);
      const blacklistWords = guild?.blacklistedwords;
  
      if (!guild) {
        return message.channel.send(lang.GLOBAL.ERROR);
      }
  
      switch (option) {
        case "add": {
          if (blacklistWords?.includes(item)) {
            return message.channel.send(
              lang.ADMIN.BLACKLISTED_ALREADY_EXISTS.replace("{item}", item)
            );
          }
          if (blacklistWords === null || !blacklistWords) {
            bot.utils.updateGuildById(guildId, {
              blacklistedwords: [...guild.blacklistedwords, item],
            });
          } else {
            bot.utils.updateGuildById(guildId, {
              blacklistedwords: [item],
            });
          }
  
          return message.channel.send(lang.ADMIN.BLACKLISTED_ADDED.replace("{item}", item));
        }
        case "remove": {
          if (blacklistWords !== null) {
            if (!blacklistWords?.includes(item)) {
              return message.channel.send(lang.ADMIN.BLACKLISTED_NOT_EXISTS.replace("{item}", item));
            }
  
            const words = blacklistWords?.filter((w) => w.toLowerCase() !== item.toLowerCase());
  
            bot.utils.updateGuildById(guildId, { blacklistedwords: words });
  
            return message.channel.send(lang.ADMIN.BLACKLISTED_REMOVED.replace("{item}", item));
          } else {
            return message.channel.send(lang.ADMIN.BLACKLISTED_NONE_YET);
          }
        }
        case "get": {
          const words = blacklistWords !== null && blacklistWords?.map((w) => `\`${w}\``).join(", ");
          return message.channel.send(words || lang.ADMIN.BLACKLISTED_NO_WORDS);
        }
        default: {
          return message.channel.send(lang.ADMIN.OPTION_DOES_NOT_EXIST.replace("{option}", option));
        }
      }
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
