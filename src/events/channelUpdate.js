const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "channelUpdate",
  async execute(bot, oldChannel, newChannel) {
    if (!oldChannel.guild) return;
    const webhook = await bot.getWebhook(newChannel.guild);
    if (!webhook) return;

    let msg = "";
    const type = newChannel.type === "category" ? "Category" : "Channel";

    if (oldChannel.name !== newChannel.name) {
      msg = `${type} **${oldChannel.name}** was renamed to **${newChannel.name}**`;
    } else {
      return;
    }

    const embed = new MessageEmbed()
      .setTitle("Channel Rename")
      .setDescription(msg)
      .setColor("ORANGE")
      .setTimestamp();

    webhook.send(embed);
  },
};
