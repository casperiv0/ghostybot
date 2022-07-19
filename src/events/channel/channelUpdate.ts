import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { Event } from "structures/Event";

export default class ChannelUpdateEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "channelUpdate");
  }

  async execute(bot: Bot, oldChannel: DJS.GuildChannel, newChannel: DJS.GuildChannel) {
    try {
      if (!oldChannel.guild.available) return;

      const me = bot.utils.getMe(oldChannel);
      if (!me?.permissions.has(DJS.PermissionFlagsBits.ManageWebhooks)) return;

      const webhook = await bot.utils.getWebhook(newChannel.guild);
      if (!webhook) return;
      const lang = await bot.utils.getGuildLang(newChannel.guild.id);

      let msg = "";
      const type = newChannel.type === DJS.ChannelType.GuildCategory ? "Category" : "Channel";
      if (oldChannel.name !== newChannel.name) {
        msg = this.bot.utils.translate(lang.EVENTS.CHANNEL_RENAME_MSG, {
          channel_type: type,
          channel: oldChannel.name,
          new_channel: newChannel.name,
        });
      } else {
        return;
      }

      const embed = bot.utils
        .baseEmbed({ author: bot.user })
        .setTitle(lang.EVENTS.CHANNEL_RENAME)
        .setDescription(msg)
        .setColor(DJS.Colors.Orange)
        .setTimestamp();

      await webhook.send({ embeds: [embed] });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
