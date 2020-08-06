const { MessageEmbed } = require("discord.js");
const { getAuditChannel } = require("../utils/functions");

module.exports = {
  name: "emojiCreate",
  async execute(bot, emoji) {
    const auditChannel = await getAuditChannel(emoji.guild.id);

    // not enabled
    if (auditChannel === null || !auditChannel) return;

    // channel not found/deleted
    if (!emoji.guild.channels.cache.some((ch) => ch.name === auditChannel.name))
      return;

    const embed = new MessageEmbed()
      .setTitle("New Emoji Created")
      .setDescription(`Emoji: **${emoji}** was created`)
      .setColor("GREEN")
      .setTimestamp();

    bot.channels.cache.get(auditChannel.id).send({ embed });
  },
};
