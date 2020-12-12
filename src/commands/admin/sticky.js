const { addSticky } = require("../../utils/functions");

module.exports = {
  name: "sticky",
  description: "Sticky a message to the bottom of the screen",
  category: "admin",
  botPermissions: ["MANAGE_MESSAGES"],
  memberPermissions: ["MANAGE_MESSAGES"],
  requiredArgs: ["message"],
  async execute(bot, message, args) {
    const stickyMsg = args.join(" ");

    if (!stickyMsg[0]) {
      return message.reply("Please provide a message");
    }

    if (stickyMsg.length > 1800) {
      return message.channel.send("Your sticky message can not be longer than 1800 characters!");
    }

    const msg = `__***:warning: Sticky Message, Read Before Typing! :warning:***__ \n\n ${stickyMsg}`;

    message.delete();

    const stickyMessage = await message.channel.send(msg);

    await addSticky(stickyMessage.id, message.channel.id, msg);
  },
};
