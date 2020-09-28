const { MessageEmbed } = require("discord.js");
const { getAuditChannel } = require("../utils/functions");

module.exports = {
  name: "emojiUpdate",
  async execute(bot, oldEm, newEm) {
    const auditChannel = await getAuditChannel(oldEm.guild.id);

    // not enabled
    if (auditChannel === null || !auditChannel) return;

    // channel not found/deleted
    if (!oldEm.guild.channels.cache.some((ch) => ch.name === auditChannel.name))
      return;

    let msg = "";

    if (oldEm.name !== newEm.name) {
      msg = `Emoji: **${oldEm.name}** was renamed to **${newEm.name}** (${newEm})`;
    } else {
      return;
    }

    const embed = new MessageEmbed()
      .setTitle("Emoji Updated")
      .setDescription(msg)
      .setColor("ORANGE")
      .setTimestamp();

    bot.channels.cache.get(auditChannel.id).send({ embed });
  },
};
