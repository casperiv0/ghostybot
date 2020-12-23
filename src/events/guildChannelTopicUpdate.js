const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "guildChannelTopicUpdate",
  /**
   * @param {import("discord.js").Client} bot
   * @param {import("discord.js").GuildChannel} channel
   * @param {string} oldTopic
   * @param {string} newTopic
   */
  async execute(bot, channel, oldTopic, newTopic) {
    if (!channel.guild) return;
    if (!channel.guild.me.hasPermission("MANAGE_WEBHOOKS")) return;

    const webhook = await bot.getWebhook(channel.guild);
    if (!webhook) return;

    const embed = new MessageEmbed()
      .setTitle("Channel Topic Updated")
      .setDescription(`Channel topic in channel: **${channel.name}** was updated`)
      .setColor("ORANGE")
      .addField("Old topic", oldTopic)
      .addField("New topic", newTopic)
      .setTimestamp();

    webhook.send(embed);
  },
};
