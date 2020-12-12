const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "channelDelete",
  async execute(bot, channel) {
    if (!channel.guild) return;
    if (!channel.guild.me.hasPermission("MANAGE_WEBHOOKS")) return;
    const webhook = await bot.getWebhook(channel.guild);
    if (!webhook) return;

    let msg = "";
    if (channel.type === "category") {
      msg = `Category: **${channel.name}** was deleted`;
    } else {
      msg = `Channel: **${channel.name}** was deleted`;
    }

    const embed = new MessageEmbed()
      .setTitle("Channel deleted")
      .setDescription(msg)
      .setColor("RED")
      .setTimestamp();

    webhook.send(embed);
  },
};
