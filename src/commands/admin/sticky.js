const { addSticky } = require("../../utils/functions");

module.exports = {
  name: "sticky",
  description: "Sticky a message to the bottom of the screen",
  category: "admin",
  botPermissions: ["MANAGE_MESSAGES"],
  memberPermissions: ["MANAGE_MESSAGES"],
  async execute(bot, message, args) {
    message.delete();

    const stickyMsg = args.join(" ");

    if (stickyMsg === "") {
      return message.reply("Please provide a message");
    }

    const msg = `__***:warning: Sticky Message, Read Before Typing! :warning:***__ \n\n ${stickyMsg}`;

    const stickyMessage = await message.channel.send(msg);

    addSticky(stickyMessage.id, message.channel.id, msg);
  },
};
