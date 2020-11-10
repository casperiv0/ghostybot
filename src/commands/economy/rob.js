const { getUserById, updateUserById } = require("../../utils/functions");

module.exports = {
  name: "rob",
  cooldown: 0,
  description: "Rob up to 1000coins from somebody",
  category: "economy",
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const member = bot.findMember(message, args);
    const amount = args.slice(1)[0];

    if (!member) {
      return message.channel.send(lang.MEMBER.PROVIDE_MEMBER);
    }

    if (member.user.id === message.author.id) {
      return message.channel.send(lang.ECONOMY.CANNOT_ROB_SELF);
    }

    if (!amount) {
      return message.channel.send(lang.LEVELS.PROVIDE_AMOUNT);
    }

    if (isNaN(amount)) {
      return message.channel.send(lang.ECONOMY.PROVIDE_VALID_AMOUNT);
    }

    if (amount > 1000) {
      return message.channel.send(lang.ECONOMY.BETWEEN_1_1000);
    }

    if (amount < 0) {
      return message.channel.send(lang.ECONOMY.BETWEEN_1_1000);
    }

    const userId = member.user.id;
    const { user } = await getUserById(userId, message.guild.id);
    const { user: robber } = await getUserById(
      message.author.id,
      message.guild.id
    );

    if (user.money <= 0) {
      return message.channel.send(lang.ECONOMY.MEMBER_NO_MONEY);
    }

    await updateUserById(userId, message.guild.id, {
      money: user.money - amount,
    });
    await updateUserById(message.author.id, message.guild.id, {
      money: robber.money + Number(amount),
    });

    return message.channel.send(
      lang.ECONOMY.ROB_SUCCESS.replace("{amount}", amount).replace(
        "{member}",
        member.user.tag
      )
    );
  },
};
