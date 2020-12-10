const { getUserById, updateUserById } = require("../../utils/functions");

module.exports = {
  name: "addmoney",
  description: "Add money to a user",
  category: "economy",
  memberPermissions: ["MANAGE_GUILD"],
  requiredArgs: ["member", "amount"],
  async execute(bot, message, args) {
    const member = bot.findMember(message, args);
    const lang = await bot.getGuildLang(message.guild.id);
    const amount = args[1];

    if (!member) {
      return message.channel.send(lang.MEMBER.PROVIDE_MEMBER);
    }

    if (member.user.bot) {
      return message.channel.send(lang.MEMBER.BOT_DATA);
    }

    if (!amount) {
      return message.channel.send(lang.LEVELS.PROVIDE_AMOUNT);
    }

    const { user } = await getUserById(member.user.id, message.guild.id);
    await updateUserById(member.user.id, message.guild.id, {
      bank: user.bank + Number(amount),
    });

    return message.channel.send(lang.ECONOMY.ADDED_MONEY.replace("{amount}", amount));
  },
};
