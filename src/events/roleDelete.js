const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "roleDelete",
  async execute(bot, role) {
    if (!role.guild) return;
    if (!role.guild.me.hasPermission(["MANAGE_WEBHOOKS"])) return;
    const webhook = await bot.getWebhook(role.guild);
    if (!webhook) return;

    const embed = new MessageEmbed()
      .setTitle("Role deleted")
      .setDescription(`Role: **${role.name}** was deleted`)
      .setColor("RED")
      .setTimestamp();

    webhook.send(embed);
  },
};
