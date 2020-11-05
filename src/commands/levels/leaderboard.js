const User = require("../../models/User.model");
const BaseEmbed = require("../../modules/BaseEmbed");

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
      const user = bot.users.cache.get(userId); // Get user
      if (user) {
        embed.addField(user.username, `${data[i].xp}xp`, true);
      }
    }

    message.channel.send({ embed });
  },
};
