const BaseEmbed = require("../../modules/BaseEmbed");
const { getUserById } = require("../../utils/functions");

module.exports = {
  name: "xp",
  description: "Get Xp from mentioned user or yourself",
  category: "levels",
  usage: "xp <user>",
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const member = bot.findMember(message, args, true);
    const { user } = await getUserById(member.id, message.guild.id);

    const embed = BaseEmbed(message)
      .setTitle(`${member.user.username} ${lang.LEVELS.XP}`)
      .setDescription(`${lang.LEVELS.XP}: ${user.xp}`);

    message.channel.send({ embed });
  },
};
