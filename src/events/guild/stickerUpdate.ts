import * as DJS from "discord.js";
import { Bot } from "#structures/Bot";
import { Event } from "#structures/Event";

export default class StickerDeleteEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "stickerUpdate");
  }

  async execute(bot: Bot, old: DJS.Sticker, newSticker: DJS.Sticker) {
    try {
      if (!newSticker.guild) return;
      if (!newSticker.guild.me?.permissions.has(DJS.Permissions.FLAGS.MANAGE_WEBHOOKS)) {
        return;
      }
      const webhook = await bot.utils.getWebhook(newSticker.guild);
      if (!webhook) return;
      const lang = await bot.utils.getGuildLang(newSticker.guild.id);

      const embed = bot.utils
        .baseEmbed({ author: bot.user })
        .setTitle(lang.EVENTS.STICKER_UPDATED)
        .setColor("ORANGE")
        .setImage(newSticker.url)
        .setTimestamp();

      if (old.name !== newSticker.name) {
        embed.addField(lang.EVENTS.NAME_UPDATED, `${old.name} -> ${newSticker.name}`);
      }

      if (old.description !== newSticker.description) {
        embed.addField(
          lang.EVENTS.DESCRIPTION_UPDATED,
          `${old.description} -> ${newSticker.description}`,
        );
      }

      await webhook.send({ embeds: [embed] });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
