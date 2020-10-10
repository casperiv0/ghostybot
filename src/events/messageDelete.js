const { MessageEmbed } = require("discord.js");
const { getAuditChannel } = require("../utils/functions");

module.exports = {
  name: "messageDelete",
  async execute(bot, message) {
    bot.snipes.set(message.channel.id,{
      content: message.content, 
      author: message.author, 
      image: message.attachments.first() ? message.attachments.first().proxyURL : null
    })
    if (!message.guild) return;
    const auditChannel = await getAuditChannel(message.guild.id);

    // not enabled
    if (auditChannel === null || !auditChannel) return;

    // channel not found/deleted
    if (
      !message.guild.channels.cache.some((ch) => ch.name === auditChannel.name)
    )
      return;

    if (message.author.id === bot.user.id) return;

    const embed = new MessageEmbed()
      .setTitle("Message deleted")
      .setDescription(
        `Message: \`${message}\` was deleted in ${message.channel}`
      )
      .setColor("RED")
      .setTimestamp();

    bot.channels.cache.get(auditChannel.id).send({ embed });
  },
};
