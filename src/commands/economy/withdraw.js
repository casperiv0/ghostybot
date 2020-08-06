const {
  removeUserBank,
  getUserBank,
  addUserMoney,
} = require("../../utils/functions");

module.exports = {
  name: "withdraw",
  description: "Withdraw money to your bank",
  category: "economy",
  usage: "withdraw <all | amount>",
  async execute(bot, message, args) {
    const user = message.author;
    let amount = args[0];

    if (!amount) return message.reply("Please provide an amount to withdraw");

    const bank = await getUserBank(message.guild.id, user.id);

    if (bank !== 0 && amount === "all") {
      addUserMoney(message.guild.id, user.id, bank);
      removeUserBank(message.guild.id, user.id, bank);
      return message.channel.send("Successfully Withdrew all your money!");
    }

    amount = Number(args[0]);

    if (typeof amount !== "number" || isNaN(amount))
      return message.reply("Please provide a valid amount to withdraw");

    if (bank < amount)
      return message.channel.send(
        "You don't have that much money in your bank!"
      );

    addUserMoney(message.guild.id, user.id, amount);
    removeUserBank(message.guild.id, user.id, amount);

    message.channel.send(`Successfully Withdrew **${amount} coins**`);
  },
};
