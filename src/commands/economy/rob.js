const { getUserMoney, removeUserMoney } = require("../../utils/functions");

module.exports = {
  name: "rob",
  cooldown: 120,
  description: "Rob up to 1000coins from somebody",
  category: "economy",
  execute(bot, message, args) {
    const user = message.mentions.users.first();
    const amount = args.slice(1)[0];

    if (!user) {
      return message.channel.send("Please provide a user mention");
    }

    if (user.id === message.author.id) {
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

    const userId = user.id;
    const guildId = message.guild.id;
    let usersMoney = getUserMoney(guildId, userId);

    if (usersMoney === null) usersMoney = 0;

    if (usersMoney < 0) {
      return message.channel.send(
        "User doesn't have any money, therefor you can't rob this user."
      );
    }

    removeUserMoney(guildId, userId, amount);

    return message.channel.send(
      `Successfully robbed **${amount}coins** from **${user.tag}**`
    );
  },
};
