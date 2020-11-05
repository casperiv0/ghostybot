const { getUserById, updateUserById } = require("../../utils/functions");

module.exports = {
  name: "withdraw",
  description: "Withdraw money to your bank",
  category: "economy",
  usage: "withdraw <all | amount>",
  aliases: ["with"],
  async execute(bot, message, args) {
    const member = message.author;
    const { user } = await getUserById(member.id, message.guild.id);
    const bank = user.bank;
    let amount = args[0];

    if (!amount) return message.reply("Please provide an amount to withdraw");

    if (bank !== 0 && amount === "all") {
      updateUserById(member.id, message.guild.id, {
        money: user.money + bank,
        bank: user.bank - bank,
      });
      return message.channel.send("Successfully Withdrew all your money!");
    }

    amount = Number(args[0]);

    if (typeof amount !== "number" || isNaN(amount)) {
      return message.reply("Please provide a valid amount to withdraw");
    }

    if (bank < amount) {
      return message.channel.send(
        "You don't have that much money in your bank!"
      );
    }

    await updateUserById(member.id, message.guild.id, {
      money: user.money + Number(amount),
      bank: user.bank - amount,
    });
    message.channel.send(`Successfully Withdrew **${amount} coins**`);
  },
};
