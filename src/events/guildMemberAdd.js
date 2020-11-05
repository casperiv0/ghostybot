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

      const user = bot.users.cache.get(member.id);
      const guild = member.guild;
      const avatar = user.displayAvatarURL({ dynamic: true });

      const embed = new MessageEmbed()
        .setTitle(`Welcome to **${guild.name}**`)
        .setThumbnail(avatar)
        .setDescription(
          `
**Username:** ${user.username}
**Tag:** ${user.tag}
**Id:** ${user.id}
        `
        )
        .setColor("BLUE")
        .setTimestamp()
        .setFooter(user.username, user.displayAvatarURL({ dynamic: true }));

      bot.channels.cache.get(welcomeChannel).send(embed);
    }

    if (welcomeRole) {
      member.roles.add(welcomeRole);
    }
  },
};
