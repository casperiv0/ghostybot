const { setServerPrefix, getServerPrefix } = require("../../utils/functions");
const { ownerId } = require("../../../config.json");

module.exports = {
  name: "prefix",
  description: "Set a prefix for your server",
  category: "admin",
  async execute(bot, message, args) {
    const prefix = args[0];
    const currentPrefix = await getServerPrefix(message.guild.id);

    if (!prefix)
      return message.channel.send(
        `Current server prefix: \`${currentPrefix}\` \n Use \`${currentPrefix}prefix <prefix>\` to set a new prefix`
      );

    if (
      ownerId.toString() !== message.author.id.toString() ||
      !message.member.permissions.has(["MANAGE_GUILD"])
    )
      return message.reply(
        "Sorry, You don't have the correct permissions for this command."
      );

    setServerPrefix(message.guild.id, prefix);
    message.channel.send(`Successfully updated prefix to \`${prefix}\``);
  },
};
