const { getAuditChannel } = require("../utils/functions");
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js')
module.exports = {
    name: "guildMemberUpdate",
    async execute(bot, newMember, oldMember) {
            const auditChannel = await getAuditChannel(newMember.guild.id);
        
            // not enabled
            if (auditChannel === null || !auditChannel) return;
        const embed = new MessageEmbed()
    .setAuthor(`${newMember.user.tag}`, newMember.user.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setColor(oldMember.guild.me.displayHexColor);

  // Nickname change
  if (oldMember.nickname != newMember.nickname) {
    // Get nickname log
 {
      const oldNickname = oldMember.nickname || '`None`';
      const newNickname = newMember.nickname || '`None`';
      embed
        .setTitle('Member Update: `Nickname`')
        .setDescription(`${newMember}'s **nickname** was changed.`)
        .addField('Nickname', `${oldNickname} ➔ ${newNickname}`);
        bot.channels.cache.get(auditChannel.id).send({ embed });
    }
  }

  // Role add
  if (oldMember.roles.cache.size > newMember.roles.cache.size) {
    // Get role log

 {
      const role = newMember.roles.cache.difference(oldMember.roles.cache).first();
      embed
        .setTitle('Member Update: `Role Add`')
        .setDescription(`${newMember} was **given** the ${role} role.`);
      bot.channels.cache.get(auditChannel.id).send({ embed });
    }
  }

  // Role remove
  if (oldMember.roles.cache.size < newMember.roles.cache.size) {
    // Get role log

 {
      const role = oldMember.roles.cache.difference(newMember.roles.cache).first();
      embed
        .setTitle('Member Update: `Role Remove`')
        .setDescription(`${newMember} was **removed** from ${role} role.`);
        bot.channels.cache.get(auditChannel.id).send({ embed });
    }
  }
}
}
