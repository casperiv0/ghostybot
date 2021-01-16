const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "membercount",
  description: "",
  category: "util",
  async execute(bot, message) {
    const lang = await bot.utils.getGuildLang(message.guild.id);
    const { name, memberCount } = message.guild;
    const bots = message.guild.members.cache.filter((mem) => mem.user.bot).size;
    const humans = message.guild.members.cache.filter((mem) => !mem.user.bot).size;

    const embed = bot.utils.baseEmbed(message)
      .setTitle(`${name} ${lang.MEMBER.MEMBERS}`)
      .addField(`**${lang.UTIL.TOTAL_MB}**`, bot.formatNumber(memberCount), true)
      .addField(`**${lang.UTIL.HUMANS}**`, bot.formatNumber(humans), true)
      .addField(`**${lang.UTIL.BOTS}**`, bot.formatNumber(bots), true);

    message.channel.send({ embed });
  },
};
