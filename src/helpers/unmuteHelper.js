const UserModel = require("../models/User.model");
const BaseEmbed = require("../modules/BaseEmbed");
const { updateUserById, findOrCreateMutedRole } = require("../utils/functions");

/**
 * @param {import("discord.js").Client} bot
 */
module.exports = async (bot) => {
  const TEN_SECOND_INTERVAL = 10000;
  bot.logger.log("Helpers", "unmuteHelper was initialized");

  setInterval(async () => {
    const mutes = await UserModel.find({ "mute.muted": true });
    if (!mutes) return;

    mutes
      .filter((u) => u.mute?.ends_at <= Date.now())
      .forEach(async (user) => {
        const guild = bot.guilds.cache.get(user.guild_id);
        if (!guild) return;
        if (!guild.me.hasPermission(["MANAGE_WEBHOOKS", "MANAGE_CHANNELS"])) return;

        const member =
          guild.members.cache.get(user.user_id) || (await guild.members.fetch(user.user_id));

        if (!member) {
          await updateUserById(user.user_id, user.guild_id, {
            mute: {
              mute: false,
              ends_at: false,
            },
          });
        } else {
          const guildUser = member.user || (await bot.users.fetch(user.user_id));
          if (!user) return;

          guild.channels.cache.forEach((channel) => {
            channel.permissionOverwrites.get(user.user_id)?.delete();
          });

          const embed = BaseEmbed({ author: guildUser })
            .setAuthor(guildUser.tag, guildUser.displayAvatarURL({ dynamic: true }))
            .setTitle("Unmute")
            .setDescription(
              `**${guildUser.tag}** was successfully **unmuted** from their temp mute`
            )
            .addField("Mute lasted", user.mute.time);

          updateUserById(user.user_id, user.guild_id, {
            mute: {
              mute: false,
              ends_at: null,
            },
          });

          const mutedRole = await findOrCreateMutedRole(guild);
          if (guild.me.hasPermission("MANAGE_ROLES")) return;
          member.roles.remove(mutedRole);

          const webhook = await bot.getWebhook(guild);
          if (!webhook) return;
          webhook.send(embed);
        }
      });
  }, TEN_SECOND_INTERVAL);
};
