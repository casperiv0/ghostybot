const { getGuildById, updateGuildById } = require("../../utils/functions");

module.exports = {
  name: "blacklistedwords",
  description: "Add/remove blacklisted words",
  category: "admin",
  options: ["get", "add", "remove"],
  memberPermissions: ["ADMINISTRATOR"],
  aliases: ["wordsfilter", "filterwords"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const [option, item] = args;
    const guildId = message.guild.id;
    const guild = await getGuildById(guildId);
    const blacklistWords = guild.blacklistedwords;

    if (!option) {
      return message.channel.send(lang.ADMIN.BLACKLISTED_PROVIDE_OPTION);
    }

    switch (option) {
      case "add": {
        if (blacklistWords.includes(item)) {
          return message.channel.send(
            lang.ADMIN.BLACKLISTED_ALREADY_EXISTS.replace("{item}", item)
          );
        }
        if (blacklistWords === null || !blacklistWords) {
          updateGuildById(guildId, {
            blacklistedwords: [...guild.blacklistedwords, item],
          });
        } else {
          updateGuildById(guildId, {
            blacklistedwords: [item],
          });
        }

        return message.channel.send(lang.ADMIN.BLACKLISTED_ADDED.replace("{item}", item));
      }
      case "remove": {
        if (blacklistWords !== null) {
          if (!blacklistWords.includes(item)) {
            return message.channel.send(lang.ADMIN.BLACKLISTED_NOT_EXISTS.replace("{item}", item));
          }

          const words = blacklistWords.filter((w) => w.toLowerCase() !== item.toLowerCase());

          updateGuildById(guildId, { blacklistedwords: words });

          return message.channel.send(lang.ADMIN.BLACKLISTED_REMOVED.replace("{item}", item));
        } else {
          return message.channel.send(lang.ADMIN.BLACKLISTED_NONE_YET);
        }
      }
      case "get": {
        const words = blacklistWords !== null && blacklistWords.map((w) => `\`${w}\``).join(", ");
        return message.channel.send(words || lang.ADMIN.BLACKLISTED_NO_WORDS);
      }
      default: {
        return message.channel.send(lang.ADMIN.OPTION_DOES_NOT_EXIST.replace("{option}", option));
      }
    }
  },
};
