const db = require("quick.db");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "moneyleaderboard",
  description: "Returns a leaderboard with the top 10 users money",
  category: "economy",
  execute(bot, message) {
    const data = db
      .fetchAll()
      .filter((da) => da.ID.startsWith("money_"))
      .sort((a, b) => b.data - a.data)
      .slice(0, 10);

    const embed = new MessageEmbed()
      .setTitle(`${message.guild.name}'s Money Leaderboard`)
      .setColor("BLUE")
      .setFooter(message.author.username)
      .setTimestamp();

    for (let i = 0; i < data.length; i++) {
      const guildId = message.guild.id;
      const userId = data[i].ID.replace(`money_${guildId}_`, ""); // get user id
      const user = bot.users.cache.get(userId); // Get user
      if (user) {
        embed.addField(user.username, `${data[i].data}Coins`, true);
      }
    }

    message.channel.send({ embed });
  },
};
