const BaseEmbed = require("../modules/BaseEmbed");

module.exports = {
  name: "guildBanAdd",
  async execute(bot, guild, user) {
    if (!guild.me.hasPermission(["MANAGE_WEBHOOKS", "VIEW_AUDIT_LOG"])) return;

    const webhook = await bot.getWebhook(guild);
    if (!webhook) return;

    const audit = await (await guild.fetchAuditLogs()).entries.first();
    const lang = await bot.getGuildLang(guild.id);

    const message = {
      author: audit.executor,
    };
    const bannedMember = user.id === audit.target.id ? audit.target.tag : lang.EVENTS.NOT_FOUND;

    const embed = BaseEmbed(message)
      .setTitle(lang.EVENTS.BAN_ADD)
      .addField(lang.EVENTS.BANNED_MEMBER, bannedMember)
      .setDescription(audit.reason)
      .setColor("RED");

    webhook.send(embed);
  },
};
