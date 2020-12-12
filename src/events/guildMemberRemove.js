const { MessageEmbed } = require("discord.js");
const {
  getGuildById,
  removeUser,
  removeUserWarnings,
  parseMessage,
} = require("../utils/functions");

module.exports = {
  name: "guildMemberRemove",
  async execute(bot, member) {
    const guild = await getGuildById(member.guild.id);
    const leaveChannel = guild.leave_channel;

    if (leaveChannel) {
      if (!member.guild.channels.cache.find((ch) => ch.id === leaveChannel)) return;

      const avatar = member.user.displayAvatarURL({ dynamic: true });

      const embed = new MessageEmbed()
        .setTitle("👋 User left")
        .setThumbnail(avatar)
        .setDescription(parseMessage(guild.leave_message, member.user))
        .setColor("RED")
        .setTimestamp()
        .setFooter(member.user.username, avatar);

      bot.channels.cache.get(leaveChannel).send(embed);

      await removeUser(member.user.id, member.guild.id);
      await removeUserWarnings(member.user.id, member.guild.id);
    }
  },
};
