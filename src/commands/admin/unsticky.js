const { removeSticky } = require("../../utils/functions");

module.exports = {
  name: "unsticky",
  description: "Sticky a message to the bottom of the screen",
  aliases: ["removesticky"],
  category: "admin",
  botPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
  memberPermissions: ["MANAGE_MESSAGES"],
  execute(bot, message) {
    message.delete();

    removeSticky(message.channel.id);

    message.channel.send(`Cleared sticky for **${message.channel}**`);
  },
};
