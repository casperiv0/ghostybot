const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "channelDelete",
  async execute(bot, channel) {
    if (!channel.guild) return;
    if (!channel.guild.me.hasPermission("MANAGE_WEBHOOKS")) return;
    const webhook = await bot.getWebhook(channel.guild);
    if (!webhook) return;
    const lang = await bot.getGuildLang(channel.guild.id);

    const type = channel.type === "category" ? "Category" : "Channel";
    const msg = lang.EVENTS.CHANNEL_DELETED_MSG.replace("{channel_type}", type).replace(
      "{channel}",
      channel.name
    );

    const embed = new MessageEmbed()
      .setTitle(lang.EVENTS.CHANNEL_DELETED)
      .setDescription(msg)
      .setColor("RED")
      .setTimestamp();

    webhook.send(embed);
  },
};
