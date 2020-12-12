const BaseEmbed = require("../modules/BaseEmbed");

module.exports = {
  name: "guildBanAdd",
  async execute(bot, guild, user) {
    if (!guild.me.hasPermission(["MANAGE_WEBHOOKS", "VIEW_AUDIT_LOG"])) return;

    const webhook = await bot.getWebhook(guild);
   if (!webhook) return;

    const audit = await (await guild.fetchAuditLogs()).entries.first();

    const message = {
      author: audit.executor,
    };
    const bannedMember =
      user.id === audit.target.id ? audit.target.tag : "Not found";

    const embed = BaseEmbed(message)
      .setTitle("Member Banned")
      .addField("Banned member", bannedMember)
      .setDescription(audit.reason)
      .setColor("RED");

    webhook.send(embed);
  },
};
