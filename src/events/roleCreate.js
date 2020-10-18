const { MessageEmbed } = require("discord.js");
const { getAuditChannel } = require("../utils/functions");

module.exports = {
  name: "roleCreate",
  async execute(bot, role) {
    const w = await role.guild.fetchWebhooks()
    const webhook = w.find(w => w.name === "GhostyBot");

    const embed = new MessageEmbed()
      .setTitle("New role Created")
      .setDescription(`Role: **${role}** was created`)
      .setColor("GREEN")
      .setTimestamp();

    webhook.send(embed)
  },
};
