const { getUserById, updateUserById } = require("../../utils/functions");

module.exports = {
  name: "deposit",
  description: "deposit money to your bank",
  category: "economy",
  usage: "!deposit <all | amount>",
  aliases: ["dep"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const member = message.author;
    const { user } = await getUserById(member.id, message.guild.id);
    const money = user.money;
    let amount = args[0];

    if (!amount) {
      return message.reply(lang.LEVELS.PROVIDE_VALID_AMOUNT);
    }

    if (amount === "all") {
      await updateUserById(member.id, message.guild.id, {
        bank: user.bank + money,
        money: user.money - money,
      });
      return message.channel.send(lang.ECONOMY.DEPOSITED_ALL);
    }

    amount = Number(args[0]);

    if (typeof amount !== "number" || isNaN(amount)) {
      return message.reply(lang.ECONOMY.PROVIDE_VALID_AMOUNT);
    }

    if (money < amount) {
      return message.channel.send(lang.ECONOMY.NOT_ENOUGH_MONEY);
    }

    await updateUserById(member.id, message.guild.id, {
      bank: user.bank + Number(amount),
      money: user.money - amount,
    });

    message.channel.send(
      lang.ECONOMY.DEPOSITED_AMOUNT.replace("{amount}", amount)
    );
  },
};
