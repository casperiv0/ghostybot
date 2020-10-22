const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "guildMemberUpdate",
  async execute(bot, newMember, oldMember) {
    if (!oldMember.guild) return;
    if (!oldMember.guild.me.hasPermission("MANAGE_WEBHOOKS")) {
      return;
    }
    const avatar = newMember.user.displayAvatarURL({ dynamic: true });

    // not enabled
    const w = await newMember.guild.fetchWebhooks();
    const webhook = w.find((w) => w.name === bot.user.username);
    // Couldn't find webhook/webhook doesn't exist
    if (!webhook) {
      return;
    }

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

      // send message
      webhook.send(embed);
    }

    // Role add
    if (oldMember.roles.cache.size > newMember.roles.cache.size) {
      // Get role log
      const role = newMember.roles.cache
        .difference(oldMember.roles.cache)
        .first();
      embed
        .setTitle("Member Update: `Role Add`")
        .setDescription(`${newMember} was **given** the ${role} role.`);

      // send message
      webhook.send(embed);
    }

    // Role remove
    if (oldMember.roles.cache.size < newMember.roles.cache.size) {
      // Get role log
      const role = oldMember.roles.cache
        .difference(newMember.roles.cache)
        .first();
      embed
        .setTitle("Member Update: `Role Remove`")
        .setDescription(`${newMember} was **removed** from ${role} role.`);

      // send message
      webhook.send(embed);
    }
  },
};
