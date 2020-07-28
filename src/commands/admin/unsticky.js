const { setStickyData } = require("../../utils/functions");

module.exports = {
  name: "unsticky",
  description: "Sticky a message to the bottom of the screen",
  aliases: ["removesticky"],
  category: "admin",
  execute(bot, message) {
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES"))
      return message.reply(
        "I don't have the correct permissions to manage messages! (Manage Messages)"
      );

    message.delete();

    const member = message.member;

    if (!member.hasPermission("MANAGE_MESSAGES"))
      return message.reply(
        "You don't have the correct permission! (Manage messages)"
      );

    setStickyData(message.guild.id, {});

    message.channel.send(`Cleared sticky for ${message.channel.name}`);
  },
};
