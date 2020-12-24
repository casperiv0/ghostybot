const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "emojiCreate",
  async execute(bot, emoji) {
    if (!emoji.guild.me.hasPermission("MANAGE_WEBHOOKS")) {
      return;
    }
    const webhook = await bot.getWebhook(emoji.guild);
    if (!webhook) return;
    const lang = await bot.getGuildLang(emoji.guild.id);

    const embed = new MessageEmbed()
      .setTitle(lang.EVENTS.EMOJI_CREATED)
      .setDescription(lang.EVENTS.EMOJI_CREATED_MSG.replace("{emoji}", emoji))
      .setColor("GREEN")
      .setTimestamp();

    webhook.send(embed);
  },
};
