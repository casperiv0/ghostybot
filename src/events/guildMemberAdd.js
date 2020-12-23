const BaseEmbed = require("../modules/BaseEmbed");
const { getGuildById, parseMessage } = require("../utils/functions");

module.exports = {
  name: "guildMemberAdd",
  async execute(bot, member) {
    if (!member.guild.me.hasPermission("MANAGE_WEBHOOKS")) return;

    const guild = await getGuildById(member.guild.id);
    const welcomeChannel = guild?.welcome_channel;
    const welcomeRole = guild?.welcome_role;

    if (welcomeChannel) {
      if (!member.guild.channels.cache.find((ch) => ch.id === welcomeChannel)) return;

      const avatar = member.user.displayAvatarURL({ dynamic: true });

      const embed = new BaseEmbed({ author: member.user })
        .setTitle(`Welcome to **${member.guild.name}**`)
        .setThumbnail(avatar)
        .setDescription(
          parseMessage(guild.welcome_message, member.user, {
            author: member.user,
            guild: member.guild,
          })
        );

      bot.channels.cache.get(welcomeChannel).send(embed);
    }

    if (welcomeRole) {
      if (!member.guild.me.hasPermission("MANAGE_ROLES")) return;
      member.roles.add(welcomeRole);
    }
  },
};
