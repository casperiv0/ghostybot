const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "leaderboard",
  description: "Shows top 10 users with the highest amount of XP",
  category: "levels",
  async execute(bot, message) {
    const data = db
      .fetchAll()
      .filter((da) => da.ID.startsWith("xp_"))
      .sort((a, b) => b.data - a.data);

    const embed = new MessageEmbed()
      .setTitle(`${message.guild.name}'s Leaderboard`)
      .setColor("BLUE")
      .setFooter(message.author.username)
      .setTimestamp();

    for (let i = 0; i < data.length; i++) {
      const guildId = message.guild.id;
      const userId = data[i].ID.replace(`xp_${guildId}_`, ""); // get user id
      const user = bot.users.cache.get(userId); // Get user
      if (user) {
        embed.addField(user.username, `${data[i].data}xp`, true);
      }
    }

    message.channel.send({ embed });
  },
};
