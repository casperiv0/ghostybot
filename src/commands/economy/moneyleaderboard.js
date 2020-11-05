const { MessageEmbed } = require("discord.js");
const User = require("../../models/User.model");

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

    const embed = new MessageEmbed()
      .setTitle(`${message.guild.name}'s Money Leaderboard`)
      .setColor("BLUE")
      .setFooter(message.author.username)
      .setTimestamp();

    for (let i = 0; i < data.length; i++) {
      const userId = data[i]._doc.user_id;
      const user = bot.users.cache.get(userId);
      if (user) {
        embed.addField(user.username, `${data[i].total} Total balance`, true);
      }
    }

    message.channel.send({ embed });
  },
};
