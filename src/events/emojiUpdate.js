const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "emojiUpdate",
  async execute(bot, oldEm, newEm) {
    if (!oldEm.guild.me.hasPermission("MANAGE_WEBHOOKS")) {
      return;
    }
    const w = await oldEm.guild.fetchWebhooks();
    const webhook = w.find((w) => w.name === bot.user.username);
    // Couldn't find webhook/webhook doesn't exist
    if (!webhook) {
      return;
    }

    let msg = "";

    if (oldEm.name !== newEm.name) {
      msg = `Emoji: **${oldEm.name}** was renamed to **${newEm.name}** (${newEm})`;
    } else {
      return;
    }

    const embed = new MessageEmbed()
      .setTitle("Emoji Updated")
      .setDescription(msg)
      .setColor("ORANGE")
      .setTimestamp();

    webhook.send(embed);
  },
};
