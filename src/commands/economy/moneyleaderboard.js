const User = require("../../models/User.model");
const BaseEmbed = require("../../modules/BaseEmbed");
const places = require("../../data/places.json");

module.exports = {
  name: "moneyleaderboard",
  description: "Returns a leaderboard with the top 10 users money",
  category: "economy",
  aliases: ["mlb"],
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const guildId = message.guild.id;
    const data = (await User.find({ guild_id: guildId }))
      .map((v) => {
        return { total: v.money + v.bank, ...v };
      })
      .sort((a, b) => b.total - a.total)
      .splice(0, 10);

    const embed = BaseEmbed(message)
      .setTitle(`${message.guild.name} ${lang.ECONOMY.MONEY_LEADERBOARD}`)
      .setFooter(lang.ECONOMY.BOTH_COUNTED);

    for (let i = 0; i < data.length; i++) {
      const userId = data[i]._doc.user_id;
      const member = message.guild.members.cache.get(userId);
      const isInPlace = [0, 1, 2].includes(i);

      if (member) {
        embed.addField(
          member.user.username,
          `${isInPlace ? places[i] : ""} ${data[i].total} ${
            lang.ECONOMY.TOTAL_BALANCE
          }`,
          true
        );
      }
    }

    message.channel.send({ embed });
  },
};
