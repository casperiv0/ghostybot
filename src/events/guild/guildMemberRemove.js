const BaseEmbed = require("../../modules/BaseEmbed");
const {
  getGuildById,
  removeUser,
  removeUserWarnings,
  parseMessage,
} = require("../../utils/functions");

const { DEFAULT_MESSAGE } = require("../../models/Guild.model");

module.exports = {
  name: "guildMemberRemove",
  async execute(bot, member) {
    const guild = await getGuildById(member.guild.id);
    const leaveData = guild.leave_data;
    if (!leaveData.enabled) return;
    const message = leaveData?.message || DEFAULT_MESSAGE;

    if (leaveData.channel_id) {
      if (!member.guild.channels.cache.find((ch) => ch.id === leaveData.channel_id)) return;

      const avatar = member.user.displayAvatarURL({ dynamic: true });

      const embed = new BaseEmbed({ author: member.user })
        .setTitle("👋 User left")
        .setThumbnail(avatar)
        .setDescription(
          parseMessage(message, member.user, {
            author: member.user,
            guild: member.guild,
          })
        )
        .setColor("RED");

      bot.channels.cache.get(leaveData.channel_id).send(embed);

      await removeUser(member.user.id, member.guild.id);
      await removeUserWarnings(member.user.id, member.guild.id);
    }
  },
};
