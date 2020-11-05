const { getUserById, updateUserById } = require("../../utils/functions");

module.exports = {
  name: "givexp",
  description: "Give someone Xp",
  category: "levels",
  usage: "givexp <amount> <user>",
  async execute(bot, message, args) {
    if (!message.member.hasPermission("MANAGE_MEMBERS")) {
      return message.channel.send(
        "You don't have the correct permissions for that! (Manage Members)"
      );
    }

    const amount = args[0];
    const member =
      message.mentions.users.first() ||
      bot.users.cache.find((u) => u.id === args[1]);

    if (!member) {
      return message.channel.send("Please provide a valid user");
    }

    if (!amount) {
      return message.channel.send("Please provide an amount");
    }

    if (isNaN(Number(amount))) {
      return message.channel.send(
        "Please provide a valid number (givexp <amount> <user>)"
      );
    }
    const { user } = await getUserById(member.id, message.guild.id);

    await updateUserById(member.id, message.guild.id, {
      xp: user.xp + Number(amount),
    });

    message.channel.send(`Successfully gave **${member.tag}** **${amount}**Xp`);
  },
};
