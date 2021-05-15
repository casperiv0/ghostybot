import { CommandInteraction, ApplicationCommandOptionChoice, version } from "discord.js";
import Bot from "structures/Bot";
import Interaction from "structures/Interaction";

interface Choices extends ApplicationCommandOptionChoice {
  return: (bot: Bot, lang: typeof import("@locales/english").default) => string;
}

const choices: Choices[] = [
  {
    name: "Guild count",
    value: "guild-count",
    return: (bot, lang) => `${bot.utils.formatNumber(bot.guilds.cache.size)} ${lang.BOT.GUILDS}`,
  },
  {
    name: "User count",
    value: "user-count",
    return: (bot, lang) => {
      const userCount = bot.utils.formatNumber(
        bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0),
      );

      return `${userCount} ${lang.BOT.USERS}`;
    },
  },
  {
    name: "Channel count",
    value: "channel-count",
    return: (bot, lang) => {
      return `${bot.utils.formatNumber(bot.channels.cache.size)} ${lang.BOT.CHANNELS}`;
    },
  },
  {
    name: "Command count",
    value: "command-count",
    return: (bot) => {
      return `${bot.utils.formatNumber(bot.commands.size)} Commands`;
    },
  },
  {
    name: "Memory Usage",
    value: "memory",
    return: (_, lang) => {
      return `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB ${lang.BOT.RAM_USAGE}`;
    },
  },
  {
    name: "Nodejs version",
    value: "uptime",
    return: () => process.version,
  },
  {
    name: "Discord.js version",
    value: "djs-version",
    return: () => version,
  },
];

export default class BotInfoInteraction extends Interaction {
  constructor(bot: Bot) {
    super(bot, {
      name: "botinfo",
      description: "Return a piece of information about the bot",
      options: [
        {
          name: "option",
          type: "STRING",
          description: "Return a piece of information about the bot",
          required: true,
          choices: choices.map((choice) => ({
            value: choice.value,
            name: choice.name,
          })),
        },
      ],
    });
  }

  async execute(interaction: CommandInteraction) {
    const lang = await this.bot.utils.getGuildLang(interaction.guildID!);

    const value = interaction.options[0].value;
    const choice = choices.find((ch) => ch.value === value);

    if (!choice) {
      interaction.reply("Invalid option!");
    }

    const message = choice?.return(this.bot, lang);
    if (!message) {
      return interaction.reply(lang.GLOBAL.ERROR);
    }

    return interaction.reply(message);
  }
}
