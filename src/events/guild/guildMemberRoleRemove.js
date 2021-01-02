const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "guildMemberRoleRemove",
  /**
   * @param {import("discord.js").Client} bot
   * @param {import("discord.js").GuildMember} member
   * @param {import("discord.js").Role} role
   */
  async execute(bot, member, role) {
    if (!member.guild) return;
    if (!member.guild.me.hasPermission("MANAGE_WEBHOOKS")) return;

    const webhook = await bot.getWebhook(member.guild);
    if (!webhook) return;

    const embed = new MessageEmbed()
      .setTimestamp()
      .setColor("ORANGE")
      .setTitle("Member Update: `Role Remove`")
      .setDescription(`${member} was **removed** from ${role} role.`);

    webhook.send(embed);
  },
};
