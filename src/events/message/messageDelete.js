const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "messageDelete",
  /**
   *
   * @param {import("discord.js").Client} bot
   * @param {import("discord.js").Message} message
   */
  async execute(bot, message) {
    if (!message.guild.me.hasPermission("MANAGE_WEBHOOKS")) return;
    if (!message.guild) return;
    const webhook = await bot.getWebhook(message.guild);
    if (!webhook) return;

    if (message.author?.id === bot.user.id) return;

    const embed = new MessageEmbed()
      .setTitle("Message deleted")
      .setDescription(`Message: \`${message.content}\` was deleted in ${message.channel}`)
      .setColor("RED")
      .setTimestamp();

    if (message.attachments.size > 0) {
      embed.setDescription(
        `Message: \`an image attachment was deleted ${
          message.content ? `+ ${message.content}\`` : "`"
        } was deleted in ${message.channel}`
      );
    }

    webhook.send(embed);
  },
};
