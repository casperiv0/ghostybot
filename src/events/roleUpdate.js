const { MessageEmbed } = require("discord.js");
const { getAuditChannel } = require("../utils/functions");

module.exports = {
  name: "roleUpdate",
  async execute(bot, oldRole, newRole) {
    if (!newRole.guild) return;
    const auditChannel = await getAuditChannel(oldRole.guild.id);

    // not enabled
    if (auditChannel === null || !auditChannel) return;

    // channel not found/deleted
    if (
      !oldRole.guild.channels.cache.some((ch) => ch.name === auditChannel.name)
    )
      return;

    let msg = "";
    if (oldRole.name !== newRole.name) {
      msg = `Role: **${oldRole.name}** was renamed to **${newRole.name}** (${newRole})`;
    } else if (oldRole.color !== newRole.color) {
      msg = `Role: **${newRole.name}**,  color: **${oldRole.color}** was recolored to **${newRole.color}** (${newRole})`;
    } else {
      return;
    }

    const embed = new MessageEmbed()
      .setTitle("Role Updated")
      .setDescription(msg)
      .setColor("ORANGE")
      .setTimestamp();

    bot.channels.cache.get(auditChannel.id).send({ embed });
  },
};
