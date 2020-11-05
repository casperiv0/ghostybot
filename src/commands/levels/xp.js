const BaseEmbed = require("../../modules/BaseEmbed");
const { getUserById } = require("../../utils/functions");

module.exports = {
  name: "xp",
  description: "Get Xp from mentioned user or yourself",
  category: "levels",
  usage: "xp <user>",
  async execute(bot, message) {
    const member = message.mentions.users.first() || message.author;
    const { user } = await getUserById(member.id, message.guild.id);

    const embed = BaseEmbed(message)
      .setTitle(`${member.username}'s XP`)
      .setDescription(`Total XP: ${user.xp}`);

    message.channel.send({ embed });
  },
};
