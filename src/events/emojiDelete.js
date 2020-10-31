const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "emojiDelete",
  async execute(bot, emoji) {
    if (!emoji.guild.me.hasPermission("MANAGE_WEBHOOKS")) {
      return;
    }
    const w = await emoji.guild.fetchWebhooks();
    const webhook = w.find((w) => w.name === bot.user.username);
    // Couldn't find webhook/webhook doesn't exist
    if (!webhook) {
      return;
    }

    const embed = new MessageEmbed()
      .setTitle("Emoji Deleted")
      .setDescription(`Emoji: **${emoji}** was deleted`)
      .setColor("RED")
      .setTimestamp();

    webhook.send(embed);
  },
};
