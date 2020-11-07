const User = require("../../models/User.model");
const BaseEmbed = require("../../modules/BaseEmbed");
const places = require("../../data/places.json");

module.exports = {
  name: "moneyleaderboard",
  description: "Returns a leaderboard with the top 10 users money",
  category: "economy",
  aliases: ["mlb"],
  async execute(bot, message) {
    const guildId = message.guild.id;
    const data = (await User.find({ guild_id: guildId }))
      .map((v) => {
        return { total: v.money + v.bank, ...v };
      })
      .sort((a, b) => b.total - a.total)
      .splice(0, 10);

    const embed = BaseEmbed(message)
      .setTitle(`${message.guild.name}'s Money Leaderboard`)
      .setFooter("Bank & Money both counted");

    for (let i = 0; i < data.length; i++) {
      const userId = data[i]._doc.user_id;
      const user = bot.users.cache.get(userId);
      const isInPlace = [0, 1, 2].includes(i);

      if (user) {
        embed.addField(
          user.username,
          `${isInPlace ? places[i] : ""} ${data[i].total} Total balance`,
          true
        );
      }
    }

    message.channel.send({ embed });
  },
};
