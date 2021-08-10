import { Bot } from "structures/Bot";
import { Event } from "structures/Event";
import { HelperHandler } from "handlers/HelperHandler";
import { InteractionHandler } from "handlers/InteractionHandler";
import { CommandHandler } from "handlers/CommandHandler";

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
    const statuses = [
      ` ${serverCount} servers.`,
      `!help | ${channelCount} channels`,
      `${userCount} users`,
      "Slash commands",
      "https://ghostybot.caspertheghost.me",
    ];

    await new HelperHandler(bot).loadHelpers();
    await new InteractionHandler(bot).loadInteractions();
    await new CommandHandler(bot).loadCommands();

    if (process.env["DEV_MODE"] === "true") {
      // await import("@scripts/generateCommandList").then((v) => v.default(this.bot));
    }
    bot.logger.log(
      "bot",
      `Bot is running with ${channelCount} channels, ${userCount} users and ${serverCount} servers`,
    );
    setInterval(() => {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      bot?.user?.setActivity(status, { type: "WATCHING" });
    }, 60000);
  }
}
