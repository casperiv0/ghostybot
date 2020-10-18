const { MessageEmbed } = require("discord.js");
const { getAuditChannel } = require("../utils/functions");

module.exports = {
  name: "messageDelete",
  async execute (bot, message) {
    if (!message.guild) return;
    const w = await message.guild.fetchWebhooks()
    const webhook = w.find(w => w.name === "GhostyBot");

    if (message.author.id === bot.user.id) return;

    const embed = new MessageEmbed()
      .setTitle("Message deleted")
      .setDescription(
        `Message: \`${message}\` was deleted in ${message.channel}`
      )
      .setColor("RED")
      .setTimestamp();

    webhook.send(embed)
  },
};
