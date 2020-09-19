const { MessageEmbed } = require("discord.js");
const { getAuditChannel } = require("../utils/functions");

module.exports = {
  name: "roleDelete",
  async execute(bot, role) {
    if (!role.guild) return;
    const auditChannel = await getAuditChannel(role.guild.id);

    // not enabled
    if (auditChannel === null || !auditChannel) return;

    // channel not found/deleted
    if (!role.guild.channels.cache.some((ch) => ch.name === auditChannel.name))
      return;

    const embed = new MessageEmbed()
      .setTitle("Role deleted")
      .setDescription(`Role: **${role.name}** was deleted`)
      .setColor("RED")
      .setTimestamp();

    bot.channels.cache.get(auditChannel.id).send({ embed });
  },
};
