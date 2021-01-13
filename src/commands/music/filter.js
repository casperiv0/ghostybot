const filters = require("../../data/filters.json");

module.exports = {
  name: "filter",
  description: "Set or remove a filter",
  category: "music",
  requiredArgs: ["option", "filter"],
  options: ["set", "remove"],
  async execute(bot, message, args) {
    const lang = await bot.utils.getGuildLang(message.guild.id);
    const [option, filter] = args;

    if (!message.member.voice.channel) {
      return message.channel.send(lang.MUSIC.MUST_BE_IN_VC);
    }

    const queue = bot.player.getQueue(message);

    if (!queue) {
      return message.channel.send(lang.MUSIC.NO_QUEUE);
    }

    if (!filters.includes(filter)) {
      return message.channel.send(lang.MUSIC.FILTER_NOT_FOUND);
    }

    const currentFilters = queue.filters;

    switch (option.toLowerCase()) {
      case "set": {
        if (currentFilters[filter] === true) {
          return message.channel.send(lang.MUSIC.FILTER_ALREADY_ENABLED.replace("{filter}", filter));
        }

        await bot.player.setFilters(message, {
          [filter]: true,
        });
        return message.channel.send(lang.MUSIC.SUC_APPLIED_FILTER.replace("{filter}", filter));
      }
      case "remove": {
        if (currentFilters[filter] === false) {
          return message.channel.send(lang.MUSIC.FILTER_NOT_ENABLED.replace("{filter}", filter));
        }

        await bot.player.setFilters(message, {
          [filter]: false,
        });
        return message.channel.send(lang.MUSIC.SUC_REM_FILTER.replace("{filter}", filter));
      }
      default: {
        return message.channel.send(lang.MUSIC.NOT_VALID_OPTION
          .replace("{option}", option));
      }
    }
  },
};
