const { getUserById, updateUserById } = require("../../utils/functions");

module.exports = {
  name: "pay",
  description: "Give money to a user",
  category: "economy",
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const member = bot.findMember(message, args);
    const amount = Number(args[1]);

    if (!member) {
      return message.channel.send(lang.MEMBER.PROVIDE_MEMBER);
    }

    if (!amount || isNaN(amount)) {
      return message.channel.send(lang.ECONOMY.PROVIDE_VALID_AMOUNT);
    }

    const { user: receiver } = await getUserById(member.id, message.guild.id);
    const { user: sender } = await getUserById(
      message.author.id,
      message.guild.id
    );

    if (amount > sender.money) {
      return message.channel.send(lang.ECONOMY.NOT_ENOUGH_MONEY);
    }

    if (receiver.user_id === sender.user_id) {
      return message.channel.send(lang.ECONOMY.CANNOT_PAY_SELF);
    }

    await updateUserById(member.id, message.guild.id, {
      money: receiver.money + amount,
    });
    await updateUserById(message.author.id, message.guild.id, {
      money: sender.money - amount,
    });

    return message.channel.send(
      lang.ECONOMY.PAY_SUCCESS.replace(
        "{member}",
        member.user.tag
      ).replace("{amount}", amount)
    );
  },
};
