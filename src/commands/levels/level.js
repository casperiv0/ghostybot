const BaseEmbed = require("../../modules/BaseEmbed");
const { getUserById, calculateUserXp } = require("../../utils/functions");

module.exports = {
  name: "level",
  description: "Get your current level",
  category: "levels",
  aliases: ["lvl", "rank"],
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const member = message.mentions.users.first() || message.author;
    const { user } = await getUserById(member.id, message.guild.id);
    const level = calculateUserXp(user.xp);

    const embed = BaseEmbed(message)
      .setTitle(`${member.username} ${lang.LEVELS.LEVEL}`)
      .setDescription(
        lang.LEVELS.MEMBER_IS_LEVEL.replace("{member}", member.username)
          .replace("{level}", level)
          .replace("{user_xp}", user.xp)
      );

    message.channel.send({ embed });
  },
};
