const { addSticky } = require("../../utils/functions");

module.exports = {
  name: "sticky",
  description: "Sticky a message to the bottom of the screen",
  category: "admin",
  botPermissions: ["MANAGE_MESSAGES"],
  memberPermissions: ["MANAGE_MESSAGES"],
  requiredArgs: ["message"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const stickyMsg = args.join(" ");

    if (stickyMsg.length > 1800) {
      return message.channel.send(lang.ADMIN.STICKY_LONG);
    }

    const msg = `${lang.ADMIN.STICKY_READ} \n\n ${stickyMsg}`;

    message.delete();

    const stickyMessage = await message.channel.send(msg);

    await addSticky(stickyMessage.id, message.channel.id, msg);
  },
};
