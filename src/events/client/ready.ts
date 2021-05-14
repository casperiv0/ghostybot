import Bot from "structures/Bot";
import Event from "structures/Event";
import BotModel from "models/Bot.model";
import HelperHandler from "handlers/HelperHandler";
import FeatureHandler from "handlers/FeatureHandler";
import InteractionHandler from "handlers/InteractionHandler";
import CommandHandler from "handlers/CommandHandler";

export default class ReadyEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "ready");
  }

  async execute(bot: Bot) {
    const serverCount = bot.utils.formatNumber(bot.guilds.cache.size);
    const channelCount = bot.utils.formatNumber(bot.channels.cache.size);
    const userCount = bot.utils.formatNumber(
      bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0),
    );
    const statuses = [
      ` ${serverCount} servers.`,
      `!help || ${channelCount} channels`,
      `${userCount} users`,
      "!help | https://ghostybot.tk",
    ];

    new HelperHandler(bot).loadHelpers();
    new FeatureHandler(bot).loadFeatures();
    new InteractionHandler(bot).loadInteractions();
    new CommandHandler(bot).loadCommands();

    const botData = await BotModel.findOne({ bot_id: bot?.user?.id });

    if (!botData) {
      BotModel.create({ bot_id: bot?.user?.id });
    } else {
      botData.used_since_up = 0;
      await botData.save();
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
