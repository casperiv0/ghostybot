const User = require("../../models/User.model");
const BaseEmbed = require("../../modules/BaseEmbed");
const places = require("../../data/places.json");

module.exports = {
  name: "leaderboard",
  description: "Shows top 10 users with the highest amount of XP",
  category: "levels",
  async execute(bot, message) {
    const guildId = message.guild.id;
    const data = (await User.find({ guild_id: guildId }))
      .sort((a, b) => b.xp - a.xp)
      .splice(0, 10);

    const embed = BaseEmbed(message).setTitle(
      `${message.guild.name}'s Leaderboard`
    );

    for (let i = 0; i < data.length; i++) {
      const userId = data[i].user_id;
      const user = bot.users.cache.get(userId);
      const isInPlace = [0, 1, 2].includes(i);

      if (user) {
        embed.addField(
          user.username,
          `${isInPlace ? places[i] : ""} ${data[i].xp}xp`,
          true
        );
      }
    }

    message.channel.send({ embed });
  },
};
