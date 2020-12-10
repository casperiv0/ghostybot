const ReactionsModel = require("../../models/Reactions.model");

module.exports = {
  name: "rrremove",
  description: "Add a reaction role",
  category: "reactions",
  usage: "rrremove <message_id>",
  aliases: ["rrdel", "rrr", "rrdelete"],
  requiredArgs: ["message_id"],
  async execute(bot, message, args) {
    const [messageId] = args;
    const lang = await bot.getGuildLang(message.guild.id);

    if (!messageId) {
      return message.channel.send(lang.REACTIONS.NO_MSG_ID);
    }

    const reaction = await ReactionsModel.findOne({
      guild_id: message.guild.id,
      message_id: messageId,
    });

    if (!reaction) {
      return message.channel.send(lang.REACTIONS.NOT_FOUND);
    }

    const channel = message.guild.channels.cache.get(reaction.channel_id);
    const msg = channel.messages.cache.get(messageId) || (await channel.messages.fetch(messageId));
    if (!msg) return message.channel.send(lang.REACTIONS.FOUND_NO_MSG);

    msg.delete();
    await ReactionsModel.findOneAndDelete({ message_id: messageId });

    return message.channel.send(lang.REACTIONS.DELETE_SUCCESS);
  },
};
