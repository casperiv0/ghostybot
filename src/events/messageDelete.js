const { MessageEmbed } = require("discord.js");
const { getAuditChannel } = require("../utils/functions");

module.exports = {
  name: "messageDelete",
  async execute(bot, msg) {
    const auditChannel = await getAuditChannel(msg.guild.id);

    // not enabled
    if (auditChannel === null || !auditChannel) return;

    // channel not found/deleted
    if (!msg.guild.channels.cache.some((ch) => ch.name === auditChannel.name))
      return;

    const embed = new MessageEmbed()
      .setTitle("Message deleted")
      .setDescription(`Message: \`${msg}\` was deleted in ${msg.channel}`)
      .setColor("RED")
      .setTimestamp();

    bot.channels.cache.get(auditChannel.id).send({ embed });
  },
};
