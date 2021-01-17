import { GuildEmoji } from "discord.js";
import Bot from "../../structures/Bot";
import Event from "../../structures/Event";

export default class EmojiDeleteEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "emojiDelete");
  }

  async execute(bot: Bot, emoji: GuildEmoji) {
    try {
      if (!emoji.guild) return;
      if (!emoji.guild.me?.hasPermission("MANAGE_WEBHOOKS")) return;
  
      const webhook = await bot.utils.getWebhook(emoji.guild);
      if (!webhook) return;
      const lang = await bot.utils.getGuildLang(emoji.guild.id);
  
      const embed = bot.utils
        .baseEmbed({ author: bot.user })
        .setTitle(lang.EVENTS.EMOJI_DELETED)
        .setDescription(lang.EVENTS.EMOJI_DELETED_MSG.replace("{emoji}", `${emoji}`))
        .setColor("RED")
        .setTimestamp();
  
      webhook.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
