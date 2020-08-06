const { MessageEmbed } = require("discord.js");
const { getAuditChannel } = require("../utils/functions");

module.exports = {
  name: "channelCreate",
  async execute(bot, channel) {
    const auditChannel = await getAuditChannel(channel.guild.id);

    // not enabled
    if (auditChannel === null || !auditChannel) return;

    // channel not found/deleted
    if (
      !channel.guild.channels.cache.some((ch) => ch.name === auditChannel.name)
    )
      return;

    const embed = new MessageEmbed()
      .setTitle("Channel Created")
      .setDescription(`Channel: **${channel}** was created`)
      .setColor("BLUE")
      .setTimestamp();

    bot.channels.cache.get(auditChannel.id).send({ embed });
  },
};
