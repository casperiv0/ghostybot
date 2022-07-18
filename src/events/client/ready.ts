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

    const statuses: {
      type: DJS.ActivityType.Listening | DJS.ActivityType.Watching;
      value: string;
    }[] = [
      {
        type: DJS.ActivityType.Listening,
        value: "/help",
      },
      {
        type: DJS.ActivityType.Watching,
        value: `${userCount} users`,
      },
      {
        type: DJS.ActivityType.Watching,
        value: `${serverCount} servers`,
      },
      {
        type: DJS.ActivityType.Watching,
        value: "https://discord.gg/XxHrtkA",
      },
      {
        type: DJS.ActivityType.Watching,
        value: "https://ghostybot.caspertheghost.me",
      },
    ];

    await new HelperHandler(bot).loadHelpers();
    await new InteractionHandler(bot).loadInteractions();

    if (process.env["DEV_MODE"] === "true") {
      void import("@scripts/generateCommandList").then((v) => v.default(this.bot));
    }

    bot.logger.log(
      "bot",
      `Bot is running with ${channelCount} channels, ${userCount} users and ${serverCount} servers`,
    );

    setInterval(() => {
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      bot.user?.setActivity(status.value, { type: status.type! });
    }, 60_000);
  }
}
