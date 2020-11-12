const User = require("../../models/User.model");
const BaseEmbed = require("../../modules/BaseEmbed");
const places = require("../../data/places.json");

module.exports = {
  name: "leaderboard",
  description: "Shows top 10 users with the highest amount of XP",
  category: "levels",
  aliases: ["lb"],
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const guildId = message.guild.id;
    const data = (await User.find({ guild_id: guildId }))
      .sort((a, b) => b.xp - a.xp)
      .splice(0, 10);

    const embed = BaseEmbed(message).setTitle(
      `${message.guild.name} ${lang.LEVELS.LEADERBOARD}`
    );

    data.forEach((item, idx) => {
      const userId = item.user_id;
      const member = message.guild.members.cache.get(userId);
      const isInPlace = [0, 1, 2].includes(idx);

      if (member) {
        embed.addField(
          member.user.username,
          `${isInPlace ? places[idx] : ""} ${data[idx].xp}xp`,
          true
        );
      }
    });

    message.channel.send({ embed });
  },
};
