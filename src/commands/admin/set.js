/* eslint-disable no-case-declarations */
const { updateGuildById, getGuildById, createWebhook } = require("../../utils/functions");

module.exports = {
  name: "set",
  description: "Set a default channel",
  category: "admin",
  usage: "set <option> <channel>",
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
    const languages = bot.getLanguages();
    const guildId = message.guild.id;
    const { prefix, starboards_channel_id } = await getGuildById(guildId);
    const option = args[0];
    const item = message.mentions.channels.first() || message.mentions.roles.first();
    const language = args[1];

    if (!option) {
      return message.channel.send(`Please provide an valid option (${prefix}h set)`);
    }

    if (
      !["level-messages", "language", "member-count-channel"].includes(option.toLowerCase()) &&
      !item
    ) {
      return message.channel.send("Please provide a valid channel or role!");
    }

    switch (option.toLowerCase()) {
      case "suggest-channel":
        updateItem("suggest_channel", item, guildId);
        message.channel.send(`Suggest channel is now: ${item}`);
        break;
      case "announce-channel":
        updateItem("announcement_channel", item, guildId);
        message.channel.send(`Announcement channel is now: ${item}`);
        break;
      case "welcome-channel":
        updateItem("welcome_channel", item, guildId);
        message.channel.send(`Enabled welcome messages. Welcome channel is now: ${item}`);
        break;
      case "leave-channel":
        updateItem("leave_channel", item, guildId);
        message.channel.send(`Enabled user leave messages. User Leave channel is now: ${item}`);
        break;
      case "audit-channel":
        if (
          !message.guild.me.hasPermission("MANAGE_WEBHOOKS") ||
          !message.guild.me.hasPermission("VIEW_AUDIT_LOG")
        ) {
          return message.channel.send("I need `MANAGE_WEBHOOKS`, permissions for audit-logs");
        }

        await createWebhook(bot, item.id);

        message.channel.send(`Enabled audit logs. Audit logs channel is now: ${item}`);
        break;
      case "welcome-role":
        updateItem("welcome_role", item, guildId);
        message.channel.send(`Enabled welcome roles. Welcome role: ${item}`);
        break;
      case "level-messages":
        updateItem("level_up_messages", true, guildId);
        message.channel.send("Successfully Enabled level up messages!");
        break;
      case "language": {
        if (!language) {
          return message.channel.send("Please provide a language");
        }
        if (!languages.includes(language)) {
          return message.channel.send(
            `Language is not available. Available languages: ${languages
              .map((l) => `\`${l}\``)
              .join(", ")}`
          );
        }
        updateItem("locale", language, guildId);
        message.channel.send(`Successfully updated language to ${language}!`);
        break;
      }
      case "starboards-channel": {
        updateItem("starboards_channel_id", item, guildId);
        bot.createStarboard(bot, item, starboards_channel_id);
        return message.channel.send(`Successfully set ${item} as starboards channel`);
      }
      case "member-count-channel": {
        updateItem("member_count_channel_id", args[1], guildId);
        return message.channel.send("Successfully set as member count channel");
      }
      default:
        return message.channel.send(`\`${option}\` is not a option!`);
    }
  },
};

async function updateItem(type, item, guildId) {
  await updateGuildById(guildId, {
    [type]: item,
  });
}
