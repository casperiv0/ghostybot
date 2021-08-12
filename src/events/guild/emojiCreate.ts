import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { Event } from "structures/Event";

export default class EmojiCreateEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "emojiCreate");
  }

  async execute(bot: Bot, emoji: DJS.GuildEmoji) {
    try {
      if (!emoji.guild) return;
      if (!emoji.guild.me?.permissions.has(DJS.Permissions.FLAGS.MANAGE_WEBHOOKS)) {
        return;
      }
      const webhook = await bot.utils.getWebhook(emoji.guild);
      if (!webhook) return;
      const lang = await bot.utils.getGuildLang(emoji.guild.id);

      const embed = bot.utils
        .baseEmbed({ author: bot.user })
        .setTitle(lang.EVENTS.EMOJI_CREATED)
        .setDescription(lang.EVENTS.EMOJI_CREATED_MSG.replace("{emoji}", `${emoji}`))
        .setColor("GREEN")
        .setTimestamp();

      await webhook.send({ embeds: [embed] });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
