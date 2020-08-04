const { MessageEmbed } = require("discord.js");
const { getUserXp } = require("../../utils/functions");

module.exports = {
  name: "xp",
  description: "Get Xp from mentioned user or yourself",
  category: "levels",
  usage: "xp <user>",
  async execute(bot, message) {
    const user = message.mentions.users.first() || message.author;
    let usersXp = await getUserXp(message.guild.id, user.id);
    if (usersXp === null) usersXp = 0;

    const embed = new MessageEmbed()
      .setTitle(`${user.username}'s XP`)
      .setDescription(`Total XP: ${usersXp}`)
      .setColor("BLUE")
      .setFooter(message.author.username)
      .setTimestamp();

    message.channel.send({ embed });
  },
};
