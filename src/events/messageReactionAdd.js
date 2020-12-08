const ReactionsModel = require("../models/Reactions.model");

module.exports = {
  name: "messageReactionAdd",
  async execute(bot, react, user) {
    if (!react.message.guild.me.hasPermission("MANAGE_MESSAGES")) return;
    if (!react.message.guild) return;
    const member = react.message.guild.members.cache.get(user.id);
    if (!member) return;

    const reaction = await ReactionsModel.findOne({
      guild_id: react.message.guild.id,
      message_id: react.message.id,
      reaction: react.emoji.toString(),
    });

    if (!reaction) return;

    if (!member.roles.cache.has(reaction.role_id)) {
      member.roles.add(reaction.role_id);
    }
  },
};
