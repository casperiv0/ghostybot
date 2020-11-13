const { MessageEmbed } = require("discord.js");
const { getGuildById } = require("../utils/functions");

module.exports = {
  name: "guildMemberAdd",
  async execute(bot, member) {
    if (!member.guild.me.hasPermission("MANAGE_WEBHOOKS")) {
      return;
    }

    const guild = await getGuildById(member.guild.id);
    const welcomeChannel = guild?.welcome_channel;
    const welcomeRole = guild?.welcome_role;

    if (welcomeChannel) {
      if (!member.guild.channels.cache.some((ch) => ch.id === welcomeChannel))
        return;

      const guild = member.guild;
      const avatar = member.user.displayAvatarURL({ dynamic: true });

      const embed = new MessageEmbed()
        .setTitle(`Welcome to **${guild.name}**`)
        .setThumbnail(avatar)
        .setDescription(
          `
**Username:** ${member.user.username}
**Tag:** ${member.user.tag}
**Id:** ${member.user.id}
        `
        )
        .setColor("BLUE")
        .setTimestamp()
        .setFooter(
          member.user.username,
          member.user.displayAvatarURL({ dynamic: true })
        );

      bot.channels.cache.get(welcomeChannel).send(embed);
    }

    if (welcomeRole) {
      member.roles.add(welcomeRole);
    }
  },
};
