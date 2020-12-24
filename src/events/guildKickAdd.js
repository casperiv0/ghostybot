const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "guildKickAdd",
  async execute(bot, guild, kick) {
    const webhook = await bot.getWebhook(guild);
    if (!webhook) return;
    const lang = await bot.getGuildLang(guild.id);

    const { member, executor, reason } = kick;

    const embed = new MessageEmbed()
      .setTitle(lang.EVENTS.KICK_ADD)
      .addField(lang.EVENTS.KICK_TAG, member.user.tag, true)
      .addField(lang.EVENTS.EXECUTED_BY, executor.tag, true)
      .addField(lang.EVENTS.REASON, reason)
      .setColor("ORANGE");

    return webhook.send(embed);
  },
};
