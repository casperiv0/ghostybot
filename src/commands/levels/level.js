const BaseEmbed = require("../../modules/BaseEmbed");
const { getUserById, calculateUserXp } = require("../../utils/functions");

module.exports = {
  name: "level",
  description: "Get your current level",
  category: "levels",
  aliases: ["lvl", "rank"],
  async execute(_bot, message) {
    const member = message.mentions.users.first() || message.author;
    const { user } = await getUserById(member.id, message.guild.id);
    const level = calculateUserXp(user.xp);

    const embed = BaseEmbed(message)
      .setTitle(`${member.username}'s Level`)
      .setDescription(
        `${member.username} is level **${level}** with **${user.xp}xp**`
      );

    message.channel.send({ embed });
  },
};
