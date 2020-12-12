const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "roleCreate",
  async execute(bot, role) {
    if (!role.guild.me.hasPermission("MANAGE_WEBHOOKS")) {
      return;
    }
    const webhook = await bot.getWebhook(role.guild);
   if (!webhook) return;

    const embed = new MessageEmbed()
      .setTitle("New role Created")
      .setDescription(`Role: **${role}** was created`)
      .setColor("GREEN")
      .setTimestamp();

    webhook.send(embed);
  },
};
