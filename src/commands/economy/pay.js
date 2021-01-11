module.exports = {
  name: "pay",
  description: "Give money to a user",
  usage: "<member>, <amount>",
  category: "economy",
  requiredArgs: ["member", "amount"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const member = await bot.findMember(message, args);
    const amount = Number(args[1]);

    if (!member) {
      return message.channel.send(lang.ADMIN.PROVIDE_VALID_USER);
    }

    if (member.user.bot) {
      return message.channel.send(lang.MEMBER.BOT_DATA);
    }

    if (!amount || isNaN(amount)) {
      return message.channel.send(lang.ECONOMY.PROVIDE_VALID_AMOUNT);
    }

    const { user: receiver } = await bot.getUserById(member.id, message.guild.id);
    const { user: sender } = await bot.getUserById(
      message.author.id,
      message.guild.id
    );

    if (amount < 0) {
      return message.channel.send(lang.ECONOMY.MIN_AMOUNT);
    }

    if (amount > sender.money) {
      return message.channel.send(lang.ECONOMY.NOT_ENOUGH_MONEY);
    }

    if (receiver.user_id === sender.user_id) {
      return message.channel.send(lang.ECONOMY.CANNOT_PAY_SELF);
    }

    await bot.updateUserById(member.id, message.guild.id, {
      money: receiver.money + amount,
    });
    await bot.updateUserById(message.author.id, message.guild.id, {
      money: sender.money - amount,
    });

    return message.channel.send(
      lang.ECONOMY.PAY_SUCCESS.replace("{member}", member.user.tag).replace(
        "{amount}",
        amount
      )
    );
  },
};
