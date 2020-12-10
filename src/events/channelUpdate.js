const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "channelUpdate",
  async execute(bot, oldChannel, newChannel) {
    if (!oldChannel.guild) return;
    if (!oldChannel.guild.me.hasPermission("MANAGE_WEBHOOKS")) {
      return;
    }
    const webhook = await bot.getWebhook(newChannel.guild);
    if (webhook === null) return;

    let msg = "";
    const type = oldChannel.type;

    if (type === "category") {
      if (oldChannel.name !== newChannel.name) {
        msg = `Category **${newChannel}** was updated from \`${oldChannel.name}\` to \`${newChannel.name}\``;
      } else {
        return;
      }
    } else {
      if (oldChannel.name !== newChannel.name) {
        msg = `Channel **${oldChannel.name}** was renamed to ${newChannel}`;
      } else if (oldChannel.topic !== newChannel.topic) {
        msg = `Channel topic in channel ${newChannel} was updated from \`${oldChannel.topic}\` to \`${newChannel.topic}\``;
      } else {
        return;
      }
    }

    const embed = new MessageEmbed()
      .setTitle("Channel Updated")
      .setDescription(msg)
      .setColor("ORANGE")
      .setTimestamp();

    webhook.send(embed);
  },
};
