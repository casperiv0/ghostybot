const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "emojiUpdate",
  async execute(bot, oldEm, newEm) {
    if (!oldEm.guild.me.hasPermission("MANAGE_WEBHOOKS")) {
      return;
    }
    const webhook = await bot.getWebhook(newEm.guild);
    if (!webhook) return;
    const lang = await bot.getGuildLang(newEm.guild.id);

    let msg = "";

    if (oldEm.name !== newEm.name) {
      msg = lang.EVENTS.EMOJI_RENAMED_MSG
        .replace("{emoji_name}", oldEm.name)
        .replace("{new_name}", newEm.name)
        .replace("{emoji}", newEm);
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
