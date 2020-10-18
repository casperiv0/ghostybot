const { MessageEmbed } = require("discord.js");
const { getAuditChannel } = require("../utils/functions");

module.exports = {
  name: "messageUpdate",
  async execute(bot, oldMsg, newMsg) {
    if (!newMsg.guild) return;
    const w = await oldMsg.guild.fetchWebhooks()
    const webhook = w.find(w => w.name === "GhostyBot");

    if (newMsg.author.id === bot.user.id) return;

    const embed = new MessageEmbed()
      .setTitle(`Message updated in **${newMsg.channel.name}**`)
      .setDescription(`Message send by **${newMsg.author.tag}** was edited`)
      .addField("**Old Message**", oldMsg)
      .addField("**New Message**", newMsg)
      .setColor("ORANGE")
      .setTimestamp();

    webhook.send(embed)
  },
};
