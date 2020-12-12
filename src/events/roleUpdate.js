const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "roleUpdate",
  async execute(bot, oldRole, newRole) {
    if (!newRole.guild) return;
    if (!newRole.guild.me.hasPermission("MANAGE_WEBHOOKS")) {
      return;
    }
    const webhook = await bot.getWebhook(newRole.guild);
   if (!webhook) return;

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

    webhook.send(embed);
  },
};
