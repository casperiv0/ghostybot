import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { Event } from "structures/Event";

export default class EmojiUpdateEvent extends Event {
  constructor(bot: Bot) {
    super(bot, DJS.Constants.Events.GUILD_EMOJI_UPDATE);
  }

  async execute(bot: Bot, oldEm: DJS.GuildEmoji, newEm: DJS.GuildEmoji) {
    try {
      if (!newEm.guild) return;
      if (!newEm.name || !oldEm.name) return;

      if (!newEm.guild.me?.permissions.has(DJS.Permissions.FLAGS.MANAGE_WEBHOOKS)) return;
      const webhook = await bot.utils.getWebhook(newEm.guild);
      if (!webhook) return;
      const lang = await bot.utils.getGuildLang(newEm.guild.id);

      let msg = "";

      if (oldEm.name !== newEm.name) {
        msg = this.bot.utils.translate(lang.EVENTS.EMOJI_RENAMED_MSG, {
          emoji_name: oldEm.name,
          new_name: newEm.name,
          emoji: newEm.toString(),
        });
      } else {
        return;
      }

      const embed = bot.utils
        .baseEmbed({ author: bot.user })
        .setTitle("Emoji Updated")
        .setDescription(msg)
        .setColor(DJS.Util.resolveColor("ORANGE"))
        .setTimestamp();

      await webhook.send({ embeds: [embed] });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
