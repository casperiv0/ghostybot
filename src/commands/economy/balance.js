const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "balance",
  description: "balance",
  category: "economy",
  aliases: ["bal"],
  async execute(bot, message, args) {
    const lang = await bot.utils.getGuildLang(message.guild.id);
    const member = await bot.utils.findMember(message, args, true);

    if (member.user.bot) {
      return message.channel.send(lang.MEMBER.BOT_DATA);
    }

    const { user } = await bot.utils.getUserById(member.id, message.guild.id);

    const embed = bot.utils.baseEmbed(message)
      .setTitle(`${member.user.username} ${lang.ECONOMY.BALANCE}`)
      .addField(lang.ECONOMY.MONEY, user.money, true)
      .addField(lang.ECONOMY.BANK, user.bank, true)
      .addField(lang.COVID.TOTAL, user.bank + user.money, true);

    message.channel.send(embed);
  },
};
