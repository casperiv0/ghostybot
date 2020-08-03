const { MessageEmbed } = require("discord.js");
const { getLeaveChannel } = require("../utils/functions");

module.exports = {
  name: "guildMemberRemove",
  async execute(bot, member) {
    const leaveChannel = await getLeaveChannel(member.guild.id);

    // not enabled
    if (leaveChannel === null || !leaveChannel) return;

    // channel not found/deleted
    if (
      !member.guild.channels.cache.some((ch) => ch.name === leaveChannel.name)
    )
      return;

    const embed = new MessageEmbed()
      .setTitle("👋 Goodbye!")
      .setDescription(`User: ${member} has left the server`)
      .setColor("BLUE")
      .setTimestamp()
      .setFooter(bot.user.username);

    bot.channels.cache.get(leaveChannel.id).send({ embed });
  },
};
