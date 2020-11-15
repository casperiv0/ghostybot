const { getUserById, updateUserById } = require("../../utils/functions");

module.exports = {
  name: "givexp",
  description: "Give someone Xp",
  category: "levels",
  usage: "givexp <user> <amount>",
  memberPermissions: ["MANAGE_MEMBERS"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const amount = args[1];
    const member = bot.findMember(message, args);

    if (!member) {
      return message.channel.send(lang.MEMBER.PROVIDE_MEMBER);
    }

    if (!amount) {
      return message.channel.send(lang.LEVELS.PROVIDE_AMOUNT);
    }

    if (isNaN(Number(amount))) {
      return message.channel.send(lang.LEVELS.PROVIDE_VALID_NR);
    }
    const { user } = await getUserById(member.id, message.guild.id);

    await updateUserById(member.id, message.guild.id, {
      xp: user.xp + Number(amount),
    });

    message.channel.send(
      lang.LEVELS.GIVE_XP_SUCCESS.replace(
        "{member}",
        member.user.tag
      ).replace("{amount}", amount)
    );
  },
};
