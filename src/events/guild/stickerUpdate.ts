import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { Event } from "structures/Event";

export default class StickerDeleteEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "stickerUpdate");
  }

  async execute(bot: Bot, old: DJS.Sticker, newSticker: DJS.Sticker) {
    try {
      if (!newSticker.guild) return;

      const me = this.bot.utils.getMe(newSticker.guild);
      if (!me?.permissions.has(DJS.PermissionFlagsBits.ManageWebhooks)) {
        return;
      }
      const webhook = await bot.utils.getWebhook(newSticker.guild);
      if (!webhook) return;
      const lang = await bot.utils.getGuildLang(newSticker.guild.id);

      const fields: DJS.EmbedField[] = [];

      const embed = bot.utils
        .baseEmbed({ author: bot.user })
        .setTitle(lang.EVENTS.STICKER_UPDATED)
        .setColor(DJS.Colors.Orange)
        .setImage(newSticker.url)
        .setTimestamp();

      if (old.name !== newSticker.name) {
        fields.push({
          inline: true,
          name: lang.EVENTS.NAME_UPDATED,
          value: `${old.name} -> ${newSticker.name}`,
        });
      }

      if (old.description !== newSticker.description) {
        fields.push({
          inline: true,
          name: lang.EVENTS.DESCRIPTION_UPDATED,
          value: `${old.description} -> ${newSticker.description}`,
        });
      }

      await webhook.send({ embeds: [embed.addFields(fields)] });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
