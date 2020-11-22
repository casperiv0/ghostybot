const BaseEmbed = require("../modules/BaseEmbed");

module.exports = {
  name: "guildBanAdd",
  async execute(bot, guild, user) {
    if (!guild.me.hasPermission("MANAGE_WEBHOOKS")) {
      return;
    }
    const w = await guild.fetchWebhooks();
    const webhook = w.find((w) => w.name === bot.user.username);

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
