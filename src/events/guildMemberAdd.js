const { MessageEmbed } = require("discord.js");
const { getWelcomeChannel, getWelcomeRole } = require("../utils/functions");

module.exports = {
  name: "guildMemberAdd",
  async execute(bot, member) {
    const welcomeChannel = await getWelcomeChannel(member.guild.id);
    const welcomeRole = await getWelcomeRole(member.guild.id);

    // not enabled
    if (welcomeRole === null || !welcomeRole) return;
    if (welcomeChannel === null || !welcomeChannel) return;

    // channel not found/deleted
    if (
      !member.guild.channels.cache.some((ch) => ch.name === welcomeChannel.name)
    )
      return;

    const user = bot.users.cache.get(member.id);

    const embed = new MessageEmbed()
      .setTitle("👋 New Member!")
      .setDescription(`Welcome ${member} to ${member.guild.name}`)
      .setColor("BLUE")
      .setTimestamp()
      .setThumbnail(user.displayAvatarURL())
      .setFooter(`UserId: ${member.id} - Tag: ${user.tag}`);

    member.roles.add(welcomeRole.id);
    bot.channels.cache.get(welcomeChannel.id).send({ embed });
  },
};
