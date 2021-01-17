import { Role } from "discord.js";
import Bot from "../../structures/Bot";
import Event from "../../structures/Event";

export default class RoleDeleteEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "roleDelete");
  }

  async execute(bot: Bot, role: Role) {
    try {
      if (!role.guild) return;
      if (!role.guild.available) return;
      const webhook = await bot.utils.getWebhook(role.guild);
      if (!webhook) return;
  
      const embed = bot.utils
        .baseEmbed({ author: bot.user })
        .setTitle("Role deleted")
        .setDescription(`Role: **${role.name}** was deleted`)
        .setColor("RED")
        .setTimestamp();
  
      webhook.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
