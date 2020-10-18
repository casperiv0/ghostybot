const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "channelCreate",
  async execute(bot, channel) {
    const w = await channel.guild.fetchWebhooks()
    const webhook = w.find(w => w.name === "GhostyBot");

    let msg = "";

    if (channel.type === "category") {
      msg = `Category: **${channel}** was created`;
    } else if(channel.type === "text") {
      msg = `Channel: **${channel}** was created`;
    }

    const embed = new MessageEmbed()
      .setTitle("Channel Created")
      .setDescription(msg)
      .setColor("GREEN")
      .setTimestamp();

    webhook.send(embed)
  },
};
