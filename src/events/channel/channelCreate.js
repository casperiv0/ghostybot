const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "channelCreate",
  async execute(bot, channel) {
    if (!channel.guild) return;
    if (!channel.guild.me.hasPermission("MANAGE_WEBHOOKS")) return;

    const webhook = await bot.getWebhook(channel.guild);
    if (!webhook) return;
    const lang = await bot.getGuildLang(channel.guild.id);

    let msg = "";

    const type = channel.type === "category" ? "Category" : "Channel";
    msg = lang.EVENTS.CHANNEL_CREATED_MSG.replace("{channel_type}", type).replace(
      "{channel}",
      channel.name
    );

    const embed = new MessageEmbed()
      .setTitle(lang.EVENTS.CHANNEL_CREATED)
      .setDescription(msg)
      .setColor("GREEN")
      .setTimestamp();

    webhook.send(embed);
  },
};
