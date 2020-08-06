const { MessageEmbed } = require("discord.js");
const { getAuditChannel } = require("../utils/functions");

module.exports = {
  name: "channelDelete",
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
      .setTitle("Channel deleted")
      .setDescription(`Channel: **${channel.name}** was deleted`)
      .setColor("RED")
      .setTimestamp();

    bot.channels.cache.get(auditChannel.id).send({ embed });
  },
};
