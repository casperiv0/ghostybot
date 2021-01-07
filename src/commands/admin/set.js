/* eslint-disable no-case-declarations */
const { updateGuildById, getGuildById, createWebhook } = require("../../utils/functions");

module.exports = {
  name: "set",
  description: "Set a default channel",
  category: "admin",
  usage: "<option> <channel>",
  options: [
    "suggest-channel",
    "announce-channel",
    "welcome-channel",
    "leave-channel",
    "audit-channel",
    "welcome-role",
    "level-messages",
    "language",
    "member-count-channel",
    "starboards-channel",
  ],
  memberPermissions: ["ADMINISTRATOR"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const languages = bot.getLanguages();
    const guildId = message.guild.id;
    const { prefix, starboards_data } = await getGuildById(guildId);
    const option = args[0];
    const item = message.mentions.channels.first() || message.mentions.roles.first();
    const language = args[1];

    if (!option) {
      return message.channel.send(`${lang.ADMIN.PROVIDE_VALID_OPTION} (${prefix}h set)`);
    }

    if (
      !["level-messages", "language", "member-count-channel"].includes(option.toLowerCase()) &&
      !item
    ) {
      return message.channel.send(lang.ADMIN.PROVIDE_VALID_CHANNEL_OR_ROLE);
    }

    switch (option.toLowerCase()) {
      case "suggest-channel":
        updateItem("suggest_channel", item, guildId);
        message.channel.send(`${lang.ADMIN.SUG_CHAN_NOW} ${item}`);
        break;
      case "announce-channel":
        updateItem("announcement_channel", item, guildId);
        message.channel.send(`${lang.ADMIN.AN_CHAN_NOW} ${item}`);
        break;
      case "welcome-channel":
        updateItem("welcome_data", { enabled: true, channel_id: item?.id }, guildId);
        message.channel.send(`${lang.ADMIN.WEL_CHAN_NOW} ${item}`);
        break;
      case "welcome-role":
        updateItem("welcome_data", { enabled: true, role_id: item?.id }, guildId);
        message.channel.send(`${lang.ADMIN.WEL_ROLE} ${item}`);
        break;
      case "leave-channel":
        updateItem("leave_data", { enabled: true, channel_id: item?.id }, guildId);
        message.channel.send(`${lang.ADMIN.LEAV_CHAN_NOW} ${item}`);
        break;
      case "audit-channel":
        if (
          !message.guild.me.hasPermission("MANAGE_WEBHOOKS") ||
          !message.guild.me.hasPermission("VIEW_AUDIT_LOG")
        ) {
          return message.channel.send(lang.ADMIN.PERM_NEED);
        }

        await createWebhook(bot, item.id);

        message.channel.send(`${lang.ADMIN.AUD_CHAN_NOW} ${item}`);
        break;
      case "level-messages":
        updateItem("level_data", { enabled: true }, guildId);
        message.channel.send(lang.ADMIN.EN_LVL_UP);
        break;
      case "language": {
        if (!language) {
          return message.channel.send(lang.ADMIN.PROVIDE_LANG);
        }
        if (!languages.includes(language)) {
          return message.channel.send(
            `${lang.ADMIN.LANG_NOT_AVAILABLE} ${languages.map((l) => `\`${l}\``).join(", ")}`
          );
        }
        updateItem("locale", language, guildId);
        message.channel.send(`${lang.ADMIN.LANG_UPDATE} ${language}!`);
        break;
      }
      case "starboards-channel": {
        updateItem("starboards_data", { enabled: true, channel_id: item?.id }, guildId);
        bot.createStarboard(bot, item, { emoji: "⭐" }, starboards_data.channel_id);
        updateGuildById(guildId, {
          starboards_Data: {
            enabled: true,
            channel_id: item.id,
            emoji: "⭐",
          },
        });
        return message.channel.send(lang.ADMIN.SET_STARBOARD_CHAN.replace("{channel}", item));
      }
      case "member-count-channel": {
        updateItem("member_count_channel_id", args[1], guildId);
        return message.channel.send(lang.ADMIN.SET_MEM_COUNT_CHAN);
      }
      default:
        return message.channel.send(lang.GLOBAL.NOT_AN_OPTION.replace("{option}", option));
    }
  },
};

async function updateItem(type, item, guildId) {
  await updateGuildById(guildId, {
    [type]: item,
  });
}
