import { Message } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";
import filters from "assets/json/filters.json";

export default class FilterCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "filter",
      description: "Set or remove a filter to the music queue",
      category: "music",
      requiredArgs: [{ name: "filter" }],
    });

    this.didEnableFilter = this.didEnableFilter.bind(this);
  }

  didEnableFilter(message: Message, filterToCheck: string): boolean {
    const queueFilters = this.bot.player.getQueue(message)?.filters;

    return !queueFilters?.includes(filterToCheck) ?? true;
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);

    try {
      const [filter] = args;

      const queue = this.bot.player.getQueue(message);
      if (!queue || !queue.playing) {
        return message.channel.send({ content: lang.MUSIC.NO_QUEUE });
      }

      if (!filters.includes(filter)) {
        return message.channel.send(lang.MUSIC.FILTER_NOT_FOUND);
      }

      const didEnableFilter = this.didEnableFilter(message, filter);

      this.bot.player.setFilter(message, filter);

      if (didEnableFilter) {
        await message.channel.send(lang.MUSIC.SUC_APPLIED_FILTER.replace("{filter}", filter));
      } else {
        await message.channel.send(lang.MUSIC.SUC_REM_FILTER.replace("{filter}", filter));
      }
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
