const { errorEmbed } = require("../../utils/functions");

module.exports = {
  name: "delete",
  description: "Delete message, up to 100",
  usage: "delete <1-100>",
  aliases: ["purge", "clear"],
  category: "admin",
  execute(bot, message, args) {
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        errorEmbed("manage messages! (Manage Messages)", message)
      );

    const user = message.member;
    const amount = args[0];
    if (!user.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        "You don't have the correct permissions for that!"
      );

    if (!amount) return message.channel.send("Please provide a number");

    message.channel.bulkDelete(Number(amount) + 1).then(() => {
      message.channel
        .send(`Deleted ${args[0]} messages.`)
        .then((msg) => msg.delete({ timeout: 2000 }, true));
    });
  },
};
