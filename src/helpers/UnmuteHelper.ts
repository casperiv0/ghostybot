import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { Helper } from "structures/Helper";
import UserModel, { IUser } from "models/User.model";

export default class ReminderHelper extends Helper {
  private TEN_SECOND_INTERVAL = 10_000;

  constructor(bot: Bot) {
    super(bot, "unmuteHelper");
  }

  async execute() {
    setInterval(async () => {
      const mutes = await UserModel.find({ "mute.muted": true });
      if (!mutes) return;

      mutes
        .filter((u: IUser) => u.mute?.ends_at <= Date.now())
        .forEach(async (user: IUser) => {
          const guild = this.bot.guilds.cache.get(user.guild_id);
          if (!guild) return;
          if (!guild.available) return;
          if (!guild.me?.permissions.has(DJS.Permissions.FLAGS.MANAGE_CHANNELS)) return;

          const message = {
            guild,
          };

          const member = await this.bot.utils.findMember(message as unknown as DJS.Message, [
            user.user_id,
          ]);

          if (!member) {
            await this.bot.utils.updateUserById(user.user_id, user.guild_id, {
              mute: {
                muted: false,
                ends_at: 0,
                reason: null,
                time: null,
              },
            });
          } else {
            const guildUser = member.user || (await this.bot.users.fetch(user.user_id));
            if (!user) return;
            const mutedRole = await this.bot.utils.findOrCreateMutedRole(guild);

            guild.channels.cache.forEach((channel) => {
              if (channel instanceof DJS.ThreadChannel) return;

              channel.permissionOverwrites.delete(user.user_id);
            });

            const embed = this.bot.utils
              .baseEmbed({ author: guildUser })
              .setAuthor(guildUser.tag, guildUser.displayAvatarURL({ dynamic: true }))
              .setTitle("Unmute")
              .setDescription(
                `**${guildUser.tag}** was successfully **unmuted** from their temp mute`,
              )
              .addField("Mute lasted", user.mute.time ?? "Unknown");

            this.bot.utils.updateUserById(user.user_id, user.guild_id, {
              mute: {
                muted: false,
                ends_at: 0,
                reason: null,
                time: null,
              },
            });

            if (!guild.me.permissions.has(DJS.Permissions.FLAGS.MANAGE_ROLES)) return;
            if (!mutedRole) return;
            member.roles.remove(mutedRole);

            const webhook = await this.bot.utils.getWebhook(guild);
            if (!webhook) return;
            await webhook.send({ embeds: [embed] });
          }
        });
    }, this.TEN_SECOND_INTERVAL);
  }
}
