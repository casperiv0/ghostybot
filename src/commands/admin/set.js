/* eslint-disable no-case-declarations */
const {
  setSuggestChannel,
  setAnnounceChannel,
  setWelcomeChannel,
  setLeaveChannel,
  setAuditChannel,
  setWelcomeRole,
  setModLog,
} = require("../../utils/functions");

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
  async execute(bot, message, args) {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.reply(
        "Sorry, You don't have the correct permissions for this command. (Administrator)"
      );

    const guildId = message.guild.id;
    const option = args[0];
    const item =
      message.mentions.channels.first() || message.mentions.roles.first();

    if (!option) return message.channel.send("Please provide an valid option");
    if (!item)
      return message.channel.send("Please provide a valid channel or role!");

    switch (option.toLowerCase()) {
      case "suggest-channel":
        setSuggestChannel(guildId, item);
        message.channel.send(`Suggest channel is now: ${item}`);
        break;
      case "announce-channel":
        setAnnounceChannel(guildId, item);
        message.channel.send(`Announcement channel is now: ${item}`);
        break;
      case "welcome-channel":
        setWelcomeChannel(guildId, item);
        message.channel.send(
          `Enabled welcome messages. Welcome channel is now: ${item}`
        );
        break;
      case "leave-channel":
        setLeaveChannel(guildId, item);
        message.channel.send(
          `Enabled user leave messages. User Leave channel is now: ${item}`
        );
        break;
      case "audit-channel":
        setAuditChannel(guildId, item);
        message.channel.send(
          `Enabled audit logs. Audit logs channel is now: ${item}`
        );
        break;
      case "welcome-role":
        setWelcomeRole(guildId, item);
        message.channel.send(`Enabled welcome roles. Welcome role: ${item}`);
        break;
      case "mod-log":
        setModLog(guildId, item);
        message.channel.send(`Enabled mod logs. Mod log: ${item}`);
        break;
      default:
        return message.channel.send(`\`${option}\` is not a option!`);
    }
  },
};
