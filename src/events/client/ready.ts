import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { Event } from "structures/Event";
import { HelperHandler } from "handlers/HelperHandler";
import { InteractionHandler } from "handlers/InteractionHandler";

export default class ReadyEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "ready", true);
  }

  async execute(bot: Bot) {
    const serverCount = bot.utils.formatNumber(bot.guilds.cache.size);
    const channelCount = bot.utils.formatNumber(bot.channels.cache.size);
    const userCount = bot.utils.formatNumber(
      bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0),
    );

    const statuses: { type: Exclude<DJS.ActivityType, "CUSTOM">; value: string }[] = [
      {
        type: "LISTENING",
        value: "/help",
      },
      {
        type: "WATCHING",
        value: `${userCount} users`,
      },
      {
        type: "WATCHING",
        value: `${serverCount} servers`,
      },
      {
        type: "WATCHING",
        value: "https://discord.gg/XxHrtkA",
      },
      {
        type: "WATCHING",
        value: "https://ghostybot.caspertheghost.me",
      },
    ];

    await new HelperHandler(bot).loadHelpers();
    await new InteractionHandler(bot).loadInteractions();

    if (process.env["DEV_MODE"] === "true") {
      await import("@scripts/generateCommandList").then((v) => v.default(this.bot));
    }

    bot.logger.log(
      "bot",
      `Bot is running with ${channelCount} channels, ${userCount} users and ${serverCount} servers`,
    );

    setInterval(() => {
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      bot.user?.setActivity(status.value, { type: status.type });
    }, 60_000);
  }
}
