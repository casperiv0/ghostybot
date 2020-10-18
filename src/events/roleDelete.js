const { MessageEmbed } = require("discord.js");
const { getAuditChannel } = require("../utils/functions");

module.exports = {
  name: "roleDelete",
  async execute(bot, role) {
    if (!role.guild) return;
    const w = await role.guild.fetchWebhooks()
    const webhook = w.find(w => w.name === "GhostyBot");

    const embed = new MessageEmbed()
      .setTitle("Role deleted")
      .setDescription(`Role: **${role.name}** was deleted`)
      .setColor("RED")
      .setTimestamp();

    webhook.send(embed)
  },
};
