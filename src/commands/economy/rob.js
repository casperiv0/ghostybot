const { getUserById, updateUserById } = require("../../utils/functions");

module.exports = {
  name: "rob",
  cooldown: 0,
  description: "Rob up to 1000coins from somebody",
  category: "economy",
  async execute(bot, message, args) {
    const member = message.mentions.users.first();
    const amount = args.slice(1)[0];

    if (!member) {
      return message.channel.send("Please provide a user mention");
    }

    if (member.id === message.author.id) {
      return message.channel.send("You can't rob yourself!");
    }

    if (!amount) {
      return message.channel.send("Please provide an amount to rob!");
    }

    if (amount < 0 || isNaN(amount)) {
      return message.channel.send("Amount must be above 0 or a valid number!");
    }

    if (amount > 1000) {
      return message.channel.send("Amount must be under 1000 and above 0");
    }

    const userId = member.id;
    const { user } = await getUserById(userId, message.guild.id);
    const { user: robber } = await getUserById(
      message.author.id,
      message.guild.id
    );

    if (user.money <= 0) {
      return message.channel.send(
        "User doesn't have any money, therefore you can't rob this user."
      );
    }

    await updateUserById(userId, message.guild.id, {
      money: user.money - amount,
    });
    await updateUserById(message.author.id, message.guild.id, {
      money: robber.money + Number(amount),
    });

    return message.channel.send(
      `Successfully robbed **${amount}coins** from **${member.tag}**`
    );
  },
};
