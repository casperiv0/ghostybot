import Bot from "../structures/Bot";
import Helper from "../structures/Helper";
import UserModel, { IUser } from "../models/User.model";

export default class ReminderHelper extends Helper {
  constructor(bot: Bot) {
    super(bot, "unmuteHelper");
  }

  async execute(bot: Bot) {
    const TEN_SECOND_INTERVAL = 10000;

    const {
      updateUserById,
      getGuildById,
      baseEmbed,
      getWebhook,
      findOrCreateMutedRole,
    } = bot.utils;

    setInterval(async () => {
      const mutes = await UserModel.find({ "mute.muted": true });
      if (!mutes) return;

      mutes
        .filter((u: IUser) => u.mute?.ends_at <= Date.now())
        .forEach(async (user: IUser) => {
          const guild = bot.guilds.cache.get(user.guild_id);
          if (!guild) return;
          if (!guild.available) return;
          if (!guild.me?.hasPermission(["MANAGE_CHANNELS"])) return;

          const member =
            guild.members.cache.get(user.user_id) || (await guild.members.fetch(user.user_id));

          if (!member) {
            await updateUserById(user.user_id, user.guild_id, {
              mute: {
                muted: false,
                ends_at: 0,
                reason: null,
                time: null,
              },
            });
          } else {
            const guildUser = member.user || (await bot.users.fetch(user.user_id));
            if (!user) return;
            const dbGuild = await getGuildById(guild.id);
            const muted_role =
              !dbGuild?.muted_role_id || dbGuild?.muted_role_id === "Disabled"
                ? guild.roles.cache.find((r) => r.name === "muted")
                : guild.roles.cache.find((r) => r.id === dbGuild?.muted_role_id) ||
                  (await findOrCreateMutedRole(guild));

            guild.channels.cache.forEach((channel) => {
              channel.permissionOverwrites.get(user.user_id)?.delete();
            });

            const embed = baseEmbed({ author: guildUser })
              .setAuthor(guildUser.tag, guildUser.displayAvatarURL({ dynamic: true }))
              .setTitle("Unmute")
              .setDescription(
                `**${guildUser.tag}** was successfully **unmuted** from their temp mute`
              )
              .addField("Mute lasted", user.mute.time);

            updateUserById(user.user_id, user.guild_id, {
              mute: {
                muted: false,
                ends_at: 0,
                reason: null,
                time: null,
              },
            });

            if (!guild.me.hasPermission("MANAGE_ROLES")) return;
            if (!muted_role) return;
            member.roles.remove(muted_role);

            const webhook = await getWebhook(guild);
            if (!webhook) return;
            webhook.send(embed);
          }
        });
    }, TEN_SECOND_INTERVAL);
  }
}
