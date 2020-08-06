/* eslint-disable no-case-declarations */
const {
  setSuggestChannel,
  setAnnounceChannel,
  setWelcomeChannel,
  setLeaveChannel,
  setAuditChannel
} = require("../../utils/functions");

module.exports = {
  name: "set",
  description: "Set a default channel",
  category: "admin",
  usage: "set <option> <channel>",
  options: ["suggest-channel", "announce-channel", "welcome-channel", "leave-channel", "audit-channel"],
  async execute(bot, message, args) {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.reply(
        "Sorry, You don't have the correct permissions for this command. (Administrator)"
      );

    const channel = message.mentions.channels.first();
    const option = args[0];

    if (!option) return message.channel.send("Please provide an valid option");
    if (!channel)
      return message.channel.send("Please provide a valid channel!");

    switch (option.toLowerCase()) {
      case "suggest-channel":
        setSuggestChannel(message.guild.id, channel);
        message.channel.send(`Suggest channel is now: ${channel}`);
        break;
      case "announce-channel":
        setAnnounceChannel(message.guild.id, channel);
        message.channel.send(`Announcement channel is now: ${channel}`);
        break;
      case "welcome-channel":
        setWelcomeChannel(message.guild.id, channel);
        message.channel.send(`Enabled welcome messages. Welcome channel is now: ${channel}`);
        break;
      case "leave-channel":
        setLeaveChannel(message.guild.id, channel);
        message.channel.send(`Enabled user leave messages. User Leave channel is now: ${channel}`);
        break;
      case "audit-channel":
        setAuditChannel(message.guild.id, channel);
        message.channel.send(`Enabled audit logs. Audit logs channel is now: ${channel}`);
        break;
      default:
        message.channel.send(`**${option}** is not a option!`);
        break;
    }
  },
};
