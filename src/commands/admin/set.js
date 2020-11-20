/* eslint-disable no-case-declarations */
const { updateGuildById, getGuildById } = require("../../utils/functions");
const fs = require("fs");

const languages = fs
  .readdirSync("./src/locales/")
  .filter((f) => f.endsWith(".js"))
  .map((la) => la.slice(0, -3));

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
  ],
  memberPermissions: ["ADMINISTRATOR"],
  async execute(bot, message, args) {
    const guildId = message.guild.id;
    const { prefix } = await getGuildById(guildId);
    const option = args[0];
    const item =
      message.mentions.channels.first() || message.mentions.roles.first();
    const language = args[1];

    if (!option) {
      return message.channel.send(
        `Please provide an valid option (${prefix}h set)`
      );
    }

    if (
      !["level-messages", "language"].includes(option.toLowerCase()) &&
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
        message.channel.send(
          `Enabled welcome messages. Welcome channel is now: ${item}`
        );
        break;
      case "leave-channel":
        updateItem("leave_channel", item, guildId);
        message.channel.send(
          `Enabled user leave messages. User Leave channel is now: ${item}`
        );
        break;
      case "audit-channel":
        if (
          !message.guild.me.hasPermission("MANAGE_WEBHOOKS") ||
          !message.guild.me.hasPermission("VIEW_AUDIT_LOG")
        ) {
          return message.channel.send(
            "I need `MANAGE_WEBHOOKS`, permissions for audit-logs"
          );
        }

        item.createWebhook(bot.user.username, {
          avatar: bot.user.displayAvatarURL({ format: "png" }),
          channel: item,
        });
        message.channel.send(
          `Enabled audit logs. Audit logs channel is now: ${item}`
        );
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
