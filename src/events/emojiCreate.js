const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "emojiCreate",
  async execute(bot, emoji) {
    const w = await emoji.guild.fetchWebhooks();
    const webhook = w.find((w) => w.name === "GhostyBot");

    const embed = new MessageEmbed()
      .setTitle("New Emoji Created")
      .setDescription(`Emoji: **${emoji}** was created`)
      .setColor("GREEN")
      .setTimestamp();

    webhook.send(embed);
  },
};
