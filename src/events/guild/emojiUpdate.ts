import { GuildEmoji } from "discord.js";
import Bot from "../../structures/Bot";
import Event from "../../structures/Event";

export default class EmojiUpdateEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "emojiUpdate");
  }

  async execute(bot: Bot, oldEm: GuildEmoji, newEm: GuildEmoji) {
    try {
      if (!newEm.guild) return;
      if (!newEm.guild.me?.hasPermission("MANAGE_WEBHOOKS")) return;
      const webhook = await bot.utils.getWebhook(newEm.guild);
      if (!webhook) return;
      const lang = await bot.utils.getGuildLang(newEm.guild.id);
  
      let msg = "";
  
      if (oldEm.name !== newEm.name) {
        msg = lang.EVENTS.EMOJI_RENAMED_MSG.replace("{emoji_name}", oldEm.name)
          .replace("{new_name}", newEm.name)
          .replace("{emoji}", `${newEm}`);
      } else {
        return;
      }
  
      const embed = bot.utils
        .baseEmbed({ author: bot.user })
        .setTitle("Emoji Updated")
        .setDescription(msg)
        .setColor("ORANGE")
        .setTimestamp();
  
      webhook.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
