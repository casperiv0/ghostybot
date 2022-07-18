import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { Event } from "structures/Event";
import { MuteData } from "./guildMuteAdd";

export default class GuildMemberRemoveEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "guildMuteRemove");
  }

  async execute(bot: Bot, guild: DJS.Guild, mute: MuteData) {
    try {
      if (!guild) return;
      if (!guild.available) return;
      const webhook = await bot.utils.getWebhook(guild);
      if (!webhook) return;

      const { member, executor } = mute;

      const embed = bot.utils
        .baseEmbed({ author: executor })
        .setTitle("User unmuted")
        .setColor(DJS.Colors.Orange)
        .addFields(
          { name: "Tag", value: member.user.tag, inline: true },
          { name: "Executed by", value: executor.tag, inline: true },
        );

      await webhook.send({ embeds: [embed] });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
