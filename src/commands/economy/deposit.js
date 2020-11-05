const { getUserById, updateUserById } = require("../../utils/functions");

module.exports = {
  name: "deposit",
  description: "deposit money to your bank",
  category: "economy",
  usage: "!deposit <all | amount>",
  aliases: ["dep"],
  async execute(bot, message, args) {
    const member = message.author;
    const { user } = await getUserById(member.id, message.guild.id);
    const money = user.money;
    let amount = args[0];

    if (!amount) {
      return message.reply("Please provide an amount to deposit");
    }

    if (money !== 0 && amount === "all") {
      await updateUserById(member.id, message.guild.id, {
        bank: user.bank + money,
        money: user.money - money,
      });
      return message.channel.send("Successfully deposited all your money!");
    }

    amount = Number(args[0]);

    if (typeof amount !== "number" || isNaN(amount)) {
      return message.reply("Please provide a valid amount to deposit");
    }

    if (money < amount) {
      return message.channel.send("You don't have that much money!");
    }

    await updateUserById(member.id, message.guild.id, {
      bank: user.bank + Number(amount),
      money: user.money - amount,
    });

    message.channel.send(`Successfully deposited **${amount} coins**`);
  },
};
