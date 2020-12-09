const ReactionsModel = require("../models/Reactions.model");

module.exports = {
  name: "messageReactionAdd",
  async execute(bot, react, user) {
    if (user.bot) return;
    const { guild } = react.message;
    if (!guild.me.hasPermission("MANAGE_MESSAGES")) return;
    if (!guild) return;
    const member = guild.members.cache.get(user.id);
    if (!member) return;

    const reaction = await ReactionsModel.findOne({
      guild_id: guild.id,
      message_id: react.message.id,
      reaction: react.emoji.toString(),
    });

    if (!reaction) return;

    if (!member.roles.cache.has(reaction.role_id)) {
      member.roles.add(reaction.role_id);
    }

    let channel = guild.channels.cache.get(reaction.channel_id);
    if (!channel) channel = await guild.channels.fetch(reaction.channel_id);
    if (!channel) return;

    const msg = await channel.messages.fetch(reaction.message_id);
    msg.reactions.resolve(react.emoji.toString()).users.remove(user.id);
  },
};
