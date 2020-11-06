const { getUserById, updateUserById } = require("../../utils/functions");

module.exports = {
  name: "pay",
  description: "Give money to a user",
  category: "economy",
  async execute(bot, message, args) {
    const member = bot.findMember(message, args);
    const amount = Number(args[1]);

    if (!member) {
      return message.channel.send("Please provide a valid user");
    }

    if (!amount || isNaN(amount)) {
      return message.channel.send(
        "Please provide a valid amount (must be a number)"
      );
    }

    const { user: receiver } = await getUserById(member.id, message.guild.id);
    const { user: sender } = await getUserById(
      message.author.id,
      message.guild.id
    );

    if (amount > sender.money) {
      return message.channel.send("You don't have that much money!");
    }

    if (receiver.user_id === sender.user_id) {
      return message.channel.send("You can't pay yourself!");
    }

    await updateUserById(member.id, message.guild.id, {
      money: receiver.money + amount,
    });
    await updateUserById(message.author.id, message.guild.id, {
      money: sender.money - amount,
    });

    return message.channel.send(
      `Successfully gave **${member.user.tag}** **${amount}coins**`
    );
  },
};
