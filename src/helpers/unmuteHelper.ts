import Bot from "../structures/Bot";
import Helper from "../structures/Helper";
import UserModel, { IUser } from "../models/User.model";

export default class ReminderHelper extends Helper {
  constructor(bot: Bot) {
    super(bot, "unmuteHelper");
  }

  async execute(bot: Bot) {
    const TEN_SECOND_INTERVAL = 10000;

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

          const message = {
            guild: guild,
          };

          const member = await bot.utils.findMember(message as any, [user.user_id]);

          if (!member) {
            await bot.utils.updateUserById(user.user_id, user.guild_id, {
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
            const mutedRole = await bot.utils.findOrCreateMutedRole(guild);

            guild.channels.cache.forEach((channel) => {
              channel.permissionOverwrites.get(user.user_id)?.delete();
            });

            const embed = bot.utils
              .baseEmbed({ author: guildUser })
              .setAuthor(guildUser.tag, guildUser.displayAvatarURL({ dynamic: true }))
              .setTitle("Unmute")
              .setDescription(
                `**${guildUser.tag}** was successfully **unmuted** from their temp mute`
              )
              .addField("Mute lasted", user.mute.time);

            bot.utils.updateUserById(user.user_id, user.guild_id, {
              mute: {
                muted: false,
                ends_at: 0,
                reason: null,
                time: null,
              },
            });

            if (!guild.me.hasPermission("MANAGE_ROLES")) return;
            if (!mutedRole) return;
            member.roles.remove(mutedRole);

            const webhook = await bot.utils.getWebhook(guild);
            if (!webhook) return;
            webhook.send(embed);
          }
        });
    }, TEN_SECOND_INTERVAL);
  }
}
