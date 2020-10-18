const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "emojiDelete",
  async execute(bot, emoji) {
    if (!emoji.guild.me.hasPermission("MANAGE_WEBHOOKS")) {
      return;
    }
    const w = await emoji.guild.fetchWebhooks();
    const webhook = w.find((w) => w.name === "GhostyBot");

    const embed = new MessageEmbed()
      .setTitle("Emoji Deleted")
      .setDescription(`Emoji: **${emoji}** was deleted`)
      .setColor("RED")
      .setTimestamp();

    webhook.send(embed);
  },
};
