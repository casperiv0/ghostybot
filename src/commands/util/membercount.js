const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "membercount",
  description: "",
  category: "util",
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const { name, memberCount } = message.guild;
    const bots = message.guild.members.cache.filter((mem) => mem.user.bot).size;
    const humans = message.guild.members.cache.filter((mem) => !mem.user.bot)
      .size;

    const embed = BaseEmbed(message)
      .setTitle(`${name} ${lang.MEMBER.MEMBERS}`)
      .addField(`**${lang.UTIL.TOTAL_MB}**`, memberCount, true)
      .addField(`**${lang.UTIL.HUMANS}**`, humans, true)
      .addField(`**${lang.UTIL.BOTS}**`, bots, true);

    message.channel.send({ embed });
  },
};
