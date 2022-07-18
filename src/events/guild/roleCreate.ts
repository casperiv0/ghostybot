import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { Event } from "structures/Event";

export default class RoleCreateEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "roleCreate");
  }

  async execute(bot: Bot, role: DJS.Role) {
    try {
      if (!role.guild) return;
      if (!role.guild.available) return;
      const webhook = await bot.utils.getWebhook(role.guild);
      if (!webhook) return;

      const embed = bot.utils
        .baseEmbed({ author: bot.user })
        .setTitle("New role Created")
        .setDescription(`Role: **${role}** was created`)
        .setColor(DJS.Colors.Green)
        .setTimestamp();

      await webhook.send({ embeds: [embed] });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
