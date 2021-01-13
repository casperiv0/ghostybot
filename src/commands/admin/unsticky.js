const { removeSticky } = require("../../utils/functions");

module.exports = {
  name: "unsticky",
  description: "Sticky a message to the bottom of the screen",
  aliases: ["removesticky"],
  category: "admin",
  botPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
  memberPermissions: ["MANAGE_MESSAGES"],
  async execute(bot, message) {
    const lang = await bot.utils.getGuildLang(message.guild.id);
    message.delete();

    removeSticky(message.channel.id);

    message.channel.send(lang.ADMIN.STICKY_CLEAR.replace("{channel}", message.channel));
  },
};
