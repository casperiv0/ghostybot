const { MessageEmbed } = require("discord.js");
const { getGuildById, parseMessage } = require("../utils/functions");

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

      const avatar = member.user.displayAvatarURL({ dynamic: true });

      const embed = new MessageEmbed()
        .setTitle(`Welcome to **${member.guild.name}**`)
        .setThumbnail(avatar)
        .setDescription(parseMessage(guild.welcome_message, member.user))
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
