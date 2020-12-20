const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "guildTicketClose",
  async execute(bot, channel, executor) {
    const webhook = await bot.getWebhook(channel.guild);
    if (!webhook) return;

    const topic = channel.topic
      ? `${channel.topic} was closed`
      : "Ticket author could not be fetched";

    const embed = new MessageEmbed()
      .setTitle("Ticket closed")
      .setDescription(topic)
      .addField("Closed by", executor.tag, true)
      .setColor("ORANGE");

    return webhook.send(embed);
  },
};
