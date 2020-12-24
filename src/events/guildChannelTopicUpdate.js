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
    const lang = await bot.getGuildLang(channel.guild.id);

    const embed = new MessageEmbed()
      .setTitle(lang.EVENTS.CHANNEL_TOPIC_UPDATED)
      .setDescription(lang.EVENTS.CHANNEL_TOPIC_UPDATED_MSG.replace("{channel}", channel.name))
      .setColor("ORANGE")
      .addField(lang.EVENTS.CHANNEL_OLD_TOPIC, oldTopic)
      .addField(lang.EVENTS.CHANNEL_NEW_TOPIC, newTopic)
      .setTimestamp();

    webhook.send(embed);
  },
};
