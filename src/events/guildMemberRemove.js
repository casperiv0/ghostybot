const { MessageEmbed } = require("discord.js");
const {
  getGuildById,
  removeUser,
  removeUserWarnings,
} = require("../utils/functions");

module.exports = {
  name: "guildMemberRemove",
  async execute(bot, member) {
    if (!member.guild.me.hasPermission("MANAGE_WEBHOOKS")) {
      return;
    }
    const guild = await getGuildById(member.guild.id);
    const leaveChannel = guild.leave_channel;

    if (leaveChannel) {
      if (!member.guild.channels.cache.some((ch) => ch.id === leaveChannel))
        return;

      const user = bot.users.cache.get(member.id);
      const avatar = user.displayAvatarURL({ dynamic: true });

      const embed = new MessageEmbed()
        .setTitle("👋 User left")
        .setThumbnail(avatar)
        .setDescription(
          `
**Tag:** ${user.tag}
**Id:** ${user.id}
        `
        )
        .setColor("RED")
        .setTimestamp()
        .setFooter(user.username, user.displayAvatarURL({ dynamic: true }));

      bot.channels.cache.get(leaveChannel).send(embed);

      await removeUser(member.user.id, member.guild.id);
      await removeUserWarnings(member.user.id, member.guild.id);
    }
  },
};
