import { CommandInteraction } from "discord.js";
import { getBotPermissions, getMemberPermissions } from "../commands/util/help";
import Bot from "../structures/Bot";
import Interaction from "../structures/Interaction";

export default class HelpInteraction extends Interaction {
  constructor(bot: Bot) {
    super(bot, {
      name: "help",
      description: "Return more information about a command",
      options: [
        {
          name: "command",
          type: "STRING",
          description: "The command you're looking for",
          required: true,
        },
      ],
    });
  }

  async execute(
    bot: Bot,
    interaction: CommandInteraction,
    args: (string | number | boolean | undefined)[],
  ) {
    const arg = `${args[0]}`;
    const command = bot.commands.get(arg) ?? bot.commands.get(bot.aliases.get(arg)!);
    const lang = await bot.utils.getGuildLang(interaction.guild?.id);

    if (!command) {
      return interaction.reply(lang.HELP.CMD_NOT_FOUND);
    } else {
      const aliases = command.options.aliases
        ? command.options.aliases.map((alias) => alias)
        : lang.GLOBAL.NONE;
      const options = command.options.options
        ? command.options.options.map((option) => option)
        : lang.GLOBAL.NONE;
      const cooldown = command.options.cooldown ? `${command.options.cooldown}s` : "3s";
      const guild = await bot.utils.getGuildById(interaction.guild?.id);
      const prefix = guild?.prefix;
      const memberPerms = getMemberPermissions(command, lang);
      const botPerms = getBotPermissions(command, lang);

      const embed = bot.utils
        .baseEmbed({
          author: interaction.user,
        })
        .addField(lang.HELP.ALIASES, aliases, true)
        .addField(lang.HELP.COOLDOWN, `${cooldown}`, true)
        .addField(
          lang.HELP.USAGE,
          command.options.usage
            ? `${prefix}${command.name} ${command.options.usage}`
            : lang.GLOBAL.NOT_SPECIFIED,
          true,
        )
        .addField(lang.UTIL.CATEGORY, command.options.category, true)
        .addField(
          lang.UTIL.DESCRIPTION,
          command.options.description ? command.options.description : lang.GLOBAL.NOT_SPECIFIED,
          true,
        )
        .addField(lang.HELP.OPTIONS, options, true)
        .addField(lang.HELP.BOT_PERMS, botPerms, true)
        .addField(lang.HELP.MEMBER_PERMS, memberPerms, true);

      interaction.reply(embed);
    }
  }
}
