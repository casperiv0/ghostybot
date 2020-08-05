const { MessageEmbed } = require("discord.js");
const { getUserXp } = require("../../utils/functions");

module.exports = {
  name: "level",
  description: "Get your current level",
  category: "levels",
  aliases: ["lvl"],
  async execute(bot, message) {
    const user = message.mentions.users.first() || message.author;
    const usersXp = await getUserXp(message.guild.id, user.id);
    const level = Math.floor(0.1 * Math.sqrt(usersXp));

    const embed = new MessageEmbed()
      .setTitle(`${user.username}'s Level`)
      .setColor("BLUE")
      .setDescription(
        `${user.username} is level **${level}** with **${usersXp}xp**`
      )
      .setTimestamp()
      .setFooter(message.author.username);

    message.channel.send({ embed });
  },
};
