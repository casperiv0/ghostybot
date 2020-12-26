module.exports = {
  name: "member-count",
  execute(bot) {
    const timeout = 60 * 1000 * 15; // 15 minutes
    async function updateMembers(guild) {
      const { member_count_channel_id } = await bot.getGuildById(guild.id);
      if (!member_count_channel_id || member_count_channel_id === "Disabled") return;

      const channel =
        guild.channels.cache.get(member_count_channel_id) ||
        (await guild.channels.fetch(member_count_channel_id));

      if (!channel) return;
      if (!channel.permissionsFor(bot.user.id).has("MANAGE_CHANNELS")) return;

      channel.setName(`Members: ${guild.memberCount.toString()}`);
    }

    setInterval(() => {
      bot.guilds.cache.array().forEach((guild) => {
        updateMembers(guild);
      });
    }, timeout);
  },
};
