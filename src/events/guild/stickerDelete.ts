import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { Event } from "structures/Event";

export default class StickerDeleteEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "stickerDelete");
  }

  async execute(bot: Bot, sticker: DJS.Sticker) {
    try {
      if (!sticker.guild) return;
      if (!sticker.guild.me?.permissions.has(DJS.PermissionFlagsBits.ManageWebhooks)) {
        return;
      }
      const webhook = await bot.utils.getWebhook(sticker.guild);
      if (!webhook) return;
      const lang = await bot.utils.getGuildLang(sticker.guild.id);

      const embed = bot.utils
        .baseEmbed({ author: bot.user })
        .setTitle(lang.EVENTS.STICKER_DELETED)
        .setDescription(lang.EVENTS.STICKER_DELETED_MSG)
        .setColor("RED")
        .setImage(sticker.url)
        .setTimestamp();

      await webhook.send({ embeds: [embed] });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
