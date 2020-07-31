const { setStickyData, errorEmbed } = require("../../utils/functions");

module.exports = {
  name: "sticky",
  description: "Sticky a message to the bottom of the screen",
  category: "admin",
  async execute(bot, message, args) {
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        errorEmbed("manage messages! (Manage Messages)", message)
      );

    message.delete();

    const member = message.member;

    if (!member.hasPermission("MANAGE_MESSAGES"))
      return message.reply(
        "You don't have the correct permission! (Manage messages)"
      );

    const stickyMsg = args.join(" ");

    if (stickyMsg === "") return message.reply("Please provide a message");

    const stickyData = {
      channelId: message.channel.id,
      id: message.id,
      msg: `__***:warning: Sticky Message, Read Before Typing! :warning:***__ \n\n ${stickyMsg}`,
    };

    const stickyMessage = await message.channel.send(stickyData.msg);
    stickyData.id = stickyMessage.id;

    setStickyData(message.guild.id, stickyData);
  },
};
