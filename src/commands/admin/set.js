/* eslint-disable no-case-declarations */
const { updateGuildById } = require("../../utils/functions");

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
  ],
  memberPermissions: ["ADMINISTRATOR"],
  async execute(bot, message, args) {
    const guildId = message.guild.id;
    const option = args[0];
    const item =
      message.mentions.channels.first() || message.mentions.roles.first();

    if (!option)
      return message.channel.send(
        "Please provide an valid option (`suggest-channel`, `announce-channel`, `welcome-channel`, `leave-channel`, `audit-channel`, `welcome-role` or `mod-log`)"
      );
    if (!item)
      return message.channel.send("Please provide a valid channel or role!");

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
