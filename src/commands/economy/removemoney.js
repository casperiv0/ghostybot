module.exports = {
  name: "removemoney",
  description: "Remove money to a user",
  category: "economy",
  memberPermissions: ["MANAGE_GUILD"],
  requiredArgs: ["member", "amount"],
  async execute(bot, message, args) {
    const member = await bot.utils.findMember(message, args);
    const lang = await bot.utils.getGuildLang(message.guild.id);
    const amount = args[1];

    if (!member) {
      return message.channel.send(lang.ADMIN.PROVIDE_VALID_MEMBER);
    }
    
    if (member.user.bot) {
      return message.channel.send(lang.MEMBER.BOT_DATA);
    }

    if (!amount) {
      return message.channel.send(lang.LEVELS.PROVIDE_AMOUNT);
    }

    const { user } = await bot.utils.getUserById(member.user.id, message.guild.id);
    await bot.utils.updateUserById(member.user.id, message.guild.id, {
      bank: user.bank - amount,
    });

    return message.channel.send(lang.ECONOMY.REMOVED_MONEY.replace("{amount}", amount));
  },
};
