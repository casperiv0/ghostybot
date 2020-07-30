/* eslint-disable no-case-declarations */
const {
  setSuggestChannel,
  setAnnounceChannel,
} = require("../../utils/functions");

module.exports = {
  name: "set",
  description: "Set a default channel",
  category: "admin",
  usage: "set <option> <channel>",
  options: ["suggest-channel", "announce-channel"],
  async execute(bot, message, args) {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.reply(
        "Sorry, You don't have the correct permissions for this command. (Administrator)"
      );

    let channel = message.mentions.channels.first();
    const option = args[0];

    if (!option) return message.channel.send("Please provide an valid option");
    if (!channel) return message.channel.send("Please provide a valid channel!");

    switch (option) {
      case "suggest-channel":
        setSuggestChannel(message.guild.id, channel);
        message.channel.send(`Suggest channel is now: ${channel}`);
        break;
      case "announce-channel":
        setAnnounceChannel(message.guild.id, channel);
        message.channel.send(`Announcement channel is now: ${channel}`);
        break;
      default:
        message.channel.send(`**${option}** is not a option!`);
        break;
    }
  },
};
