const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "channelDelete",
  async execute(bot, channel) {
    const w = await channel.guild.fetchWebhooks();
    const webhook = w.find((w) => w.name === "GhostyBot");

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
