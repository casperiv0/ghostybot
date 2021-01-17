import { Role } from "discord.js";
import Bot from "../../structures/Bot";
import Event from "../../structures/Event";

export default class RoleUpdateEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "roleUpdate");
  }

  async execute(bot: Bot, oldRole: Role, newRole: Role) {
    try {
      if (!newRole.guild) return;
      if (!newRole.guild.available) return;
      const webhook = await bot.utils.getWebhook(newRole.guild);
      if (!webhook) return;
  
      let msg = "";
      if (oldRole.name !== newRole.name) {
        msg = `Role: **${oldRole.name}** was renamed to **${newRole.name}** (${newRole})`;
      } else if (oldRole.color !== newRole.color) {
        msg = `Role: **${newRole.name}**,  color: **${oldRole.color}** was recolored to **${newRole.color}** (${newRole})`;
      } else {
        return;
      }
  
      const embed = bot.utils
        .baseEmbed({ author: bot.user })
        .setTitle("Role Updated")
        .setDescription(msg)
        .setColor("ORANGE")
        .setTimestamp();
  
      webhook.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
