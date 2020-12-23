const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "guildMemberNicknameUpdate",
  /**
   * @param {import("discord.js").Client} bot
   * @param {import("discord.js").GuildMember} member
   * @param {string} oldNick
   * @param {string} newNick
   */
  async execute(bot, member, oldNick, newNick) {
    if (!member.guild) return;
    if (!member.guild.me.hasPermission("MANAGE_WEBHOOKS")) return;

    const webhook = await bot.getWebhook(member.guild);
    if (!webhook) return;

    const oldNickname = oldNick || "`None`";
    const newNickname = newNick || "`None`";

    const embed = new MessageEmbed()
      .setTimestamp()
      .setColor("ORANGE")
      .setTitle("Member Update: `Nickname`")
      .setDescription(`${member}'s **nickname** was changed.`)
      .addField("Nickname", `${oldNickname} ➔ ${newNickname}`);

    webhook.send(embed);
  },
};
