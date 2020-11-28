module.exports = {
  name: "givend",
  description: "Ends a giveaway",
  category: "giveaway",
  usage: "givend <messageId> \n **Example:** !giveaway end <messageId>",
  memberPermissions: ["MANAGE_GUILD"],
  aliases: ["gend"],
  execute(bot, message, args) {
    const messageId = args[0];

    if (!messageId) {
      return message.channel.send("Please provide a messageId");
    }

    bot.giveawayManager
      .delete(messageId)
      .then(() => message.channel.send("Successfully ended giveaway"))
      .catch(() =>
        message.channel.send("Giveaway not ended yet or was not found")
      );
  },
};
