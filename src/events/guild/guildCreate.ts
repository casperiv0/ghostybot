import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { Event } from "structures/Event";

export default class GuildCreateEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "guildCreate");
  }

  async execute(bot: Bot, guild: DJS.Guild) {
    if (!guild) return;
    await bot.utils.addGuild(guild.id);

    if (guild.systemChannel) {
      const BUTTONS = [
        new DJS.ButtonComponent()
          .setLabel("Open Dashboard")
          .setStyle("LINK")
          .setURL("https://ghostybot.caspertheghost.me"),
        new DJS.ButtonComponent()
          .setLabel("Support Server")
          .setStyle("LINK")
          .setURL("https://discord.gg/XxHrtkA"),
      ];

      const embed = bot.utils
        .baseEmbed({ author: bot.user! })
        .setTitle("Hello!")
        .setDescription(
          `
Thanks for inviting me to this Discord server!
I am GhostyBot a special bot that can do a lot such as moderation, play games and music, etc!`,
        );

      const row = new DJS.ActionRow().addComponents(BUTTONS);

      await guild.systemChannel.send({ embeds: [embed], components: [row] });
    }
  }
}
