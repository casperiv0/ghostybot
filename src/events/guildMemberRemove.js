const { MessageEmbed } = require("discord.js");
const { getLeaveChannel } = require("../utils/functions");

module.exports = {
  name: "guildMemberRemove",
  async execute(bot, member) {
    if (!member.guild.me.hasPermission("MANAGE_WEBHOOKS")) {
      return;
    }
    const leaveChannel = await getLeaveChannel(member.guild.id);

    if (leaveChannel !== null || leaveChannel) {
      if (
        !member.guild.channels.cache.some((ch) => ch.name === leaveChannel.name)
      )
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

      bot.channels.cache.get(leaveChannel.id).send(embed);
    }
  },
};
