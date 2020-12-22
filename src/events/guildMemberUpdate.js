const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "guildMemberUpdate",
  async execute(bot, oldMember, newMember) {
    if (!newMember.guild) return;
    if (!newMember.guild.me.hasPermission(["MANAGE_WEBHOOKS"])) return;

    const avatar = newMember.user.displayAvatarURL({ dynamic: true });
    const webhook = await bot.getWebhook(newMember.guild);
    if (!webhook) return;

    const embed = new MessageEmbed()
      .setAuthor(`${newMember.user.tag}`, avatar)
      .setTimestamp()
      .setColor("ORANGE");

    // Nickname change
    if (oldMember.nickname !== newMember.nickname) {
      // Get nickname log
      const oldNickname = oldMember.nickname || "`None`";
      const newNickname = newMember.nickname || "`None`";
      embed
        .setTitle("Member Update: `Nickname`")
        .setDescription(`${newMember}'s **nickname** was changed.`)
        .addField("Nickname", `${oldNickname} ➔ ${newNickname}`);

      return webhook.send(embed);
    }

    // Role add
    if (oldMember.roles.cache.size < newMember.roles.cache.size) {
      const role = newMember.roles.cache.difference(oldMember.roles.cache).first();
      embed
        .setTitle("Member Update: `Role Add`")
        .setDescription(`${newMember} was **given** the ${role} role.`);

      // send message
      return webhook.send(embed);
    }

    // Role remove
    if (oldMember.roles.cache.size > newMember.roles.cache.size) {
      const role = oldMember.roles.cache.difference(newMember.roles.cache).first();
      embed
        .setTitle("Member Update: `Role Remove`")
        .setDescription(`${newMember} was **removed** from ${role} role.`);

      // send message
      return webhook.send(embed);
    }
  },
};
