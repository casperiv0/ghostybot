module.exports = {
  name: "givreroll",
  description: "Reroll a giveaway",
  category: "giveaway",
  memberPermissions: ["MANAGE_GUILD"],
  aliases: ["greroll"],
  execute(bot, message, args) {
    const messageId = args[0];

    if (!messageId) {
      return message.channel.send("Please provide a messageId");
    }

    bot.giveawayManager
      .reroll(messageId)
      .catch(() =>
        message.channel.send(`No giveaway found with id: ${messageId}`)
      );
  },
};
