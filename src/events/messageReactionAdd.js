const ReactionsModel = require("../models/Reactions.model");

module.exports = {
  name: "messageReactionAdd",
  async execute(bot, react, user) {
    if (user.bot) return;
    const { guild } = react.message;
    if (!guild.me.hasPermission(["MANAGE_MESSAGES", "MANAGE_ROLES"])) return;
    if (!guild) return;
    const member = guild.members.cache.get(user.id);
    if (!member) return;

    const dbReaction = await ReactionsModel.findOne({
      guild_id: guild.id,
      message_id: react.message.id,
    });
    if (!dbReaction) return;
    const reaction = dbReaction.reactions.find(
      (r) => r.emoji === react.emoji.toString()
    );
    if (!reaction) return;

    if (!member.roles.cache.has(reaction.role_id)) {
      member.roles.add(reaction.role_id);
    } else {
      member.roles.remove(reaction.role_id);
    }

    let channel = guild.channels.cache.get(dbReaction.channel_id);
    if (!channel) return;

    const msg = await channel.messages.fetch(dbReaction.message_id);
    msg.reactions.resolve(react.emoji.toString()).users.remove(user.id);
  },
};
