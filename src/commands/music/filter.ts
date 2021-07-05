import { Message } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";
import filters from "assets/json/filters.json";

export default class FilterCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "filter",
      description: "Set or remove a filter",
      category: "music",
      requiredArgs: [{ name: "option" }, { name: "filter" }],
      options: ["set", "remove"],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const [option, filter] = args;

      if (!message.member?.voice.channel) {
        return message.channel.send({ content: lang.MUSIC.MUST_BE_IN_VC });
      }

      const queue = this.bot.player.getQueue(message);

      if (!queue) {
        return message.channel.send({ content: lang.MUSIC.NO_QUEUE });
      }

      if (queue && !this.bot.utils.isBotInSameChannel(message)) {
        return message.channel.send({ content: "Bot is not in this voice channel!" });
      }

      if (!filters.includes(filter)) {
        return message.channel.send({ content: lang.MUSIC.FILTER_NOT_FOUND });
      }

      const currentFilters = queue.filters;

      switch (option.toLowerCase()) {
        case "set": {
          if (currentFilters[filter] === true) {
            return message.channel.send({
              content: lang.MUSIC.FILTER_ALREADY_ENABLED.replace("{filter}", filter),
            });
          }

          await this.bot.player.setFilters(message, {
            [filter]: true,
          });
          return message.channel.send({
            content: lang.MUSIC.SUC_APPLIED_FILTER.replace("{filter}", filter),
          });
        }
        case "remove": {
          if (currentFilters[filter] === false) {
            return message.channel.send({
              content: lang.MUSIC.FILTER_NOT_ENABLED.replace("{filter}", filter),
            });
          }

          await this.bot.player.setFilters(message, {
            [filter]: false,
          });
          return message.channel.send({
            content: lang.MUSIC.SUC_REM_FILTER.replace("{filter}", filter),
          });
        }
        default: {
          return message.channel.send({
            content: lang.MUSIC.NOT_VALID_OPTION.replace("{option}", option),
          });
        }
      }
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
