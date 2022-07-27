import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { Event } from "structures/Event";

export default class EmojiDeleteEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "emojiDelete");
  }

  async execute(bot: Bot, emoji: DJS.GuildEmoji) {
    try {
      if (!emoji.guild) return;

      const me = bot.utils.getMe(emoji);
      if (!me?.permissions.has(DJS.PermissionFlagsBits.ManageWebhooks)) return;

      const webhook = await bot.utils.getWebhook(emoji.guild);
      if (!webhook) return;
      const lang = await bot.utils.getGuildLang(emoji.guild.id);

      const embed = bot.utils
        .baseEmbed({ author: bot.user })
        .setTitle(lang.EVENTS.EMOJI_DELETED)
        .setDescription(
          this.bot.utils.translate(lang.EVENTS.EMOJI_DELETED_MSG, {
            emoji: emoji.toString(),
          }),
        )
        .setColor(DJS.Colors.Red)
        .setTimestamp();

      await webhook.send({ embeds: [embed] });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
