const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "messageDelete",
  async execute(bot, message) {
    if (!message.guild.me.hasPermission("MANAGE_WEBHOOKS")) return;
    if (!message.guild) return;
    const webhook = await bot.getWebhook(message.guild);
    if (!webhook) return;

    if (message.author?.id === bot.user.id) return;

    const embed = new MessageEmbed()
      .setTitle("Message deleted")
      .setDescription(`Message: \`${message}\` was deleted in ${message.channel}`)
      .setColor("RED")
      .setTimestamp();

    webhook.send(embed);
  },
};
