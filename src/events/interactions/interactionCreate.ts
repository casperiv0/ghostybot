import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { Event } from "structures/Event";
import { IGuild } from "models/Guild.model";
import { SubCommand } from "structures/Command/SubCommand";
import BlacklistedModel, { IBlacklist } from "models/Blacklisted.model";
import { handleCategories } from "src/interactions/util/Help";

export default class InteractionEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "interactionCreate");
  }

  async execute(bot: Bot, interaction: DJS.CommandInteraction) {
    if (interaction.isSelectMenu() && interaction.customId === "HELP_CATEGORIES") {
      return handleCategories(interaction, bot);
    }

    if (!interaction.isCommand()) return;
    if (!interaction.inGuild()) return;

    await bot.application?.commands.fetch(interaction.commandId).catch(() => null);

    const lang = await this.bot.utils.getGuildLang(interaction.guild?.id);

    try {
      const command = bot.interactions.get(this.getCommandName(interaction));

      const blacklistedUsers: IBlacklist[] = await BlacklistedModel.find();
      if (blacklistedUsers) {
        const isBlacklisted = blacklistedUsers.find((u) => u.user_id === interaction.user.id);

        if (isBlacklisted) {
          return interaction.reply({ ephemeral: true, content: lang.MESSAGE.BLACKLISTED });
        }
      }

      if (!command) {
        if (!interaction.commandId) return;

        const guild = await bot.utils.getGuildById(interaction.guildId);
        const command = guild?.slash_commands.find((c) => c.slash_cmd_id === interaction.commandId);
        if (!command) return;

        return interaction.reply({ content: command.response });
      }

      const dbGuild = await bot.utils.getGuildById(interaction.guildId!);
      const topLevelName =
        command instanceof SubCommand ? command.options.commandName : command.name;

      if (dbGuild?.disabled_categories.includes(topLevelName)) {
        return interaction.reply({
          ephemeral: true,
          content: lang.MESSAGE.CATEGORY_DISABLED.replace("{category}", topLevelName),
        });
      }

      if (this.isSubCommandDisabled(dbGuild!, interaction)) {
        return interaction.reply({
          ephemeral: true,
          content: lang.MESSAGE.COMMAND_DISABLED,
        });
      }

      if (command.validate) {
        const { ok, error } = await command.validate(interaction, lang);

        if (!ok) {
          // @ts-expect-error this works!
          return interaction.reply(error);
        }
      }

      await command?.execute(interaction, lang);
    } catch (e) {
      if (interaction.replied) return;
      bot.utils.sendErrorLog(e, "error");

      if (interaction.deferred) {
        interaction.editReply({ content: lang.GLOBAL.ERROR });
      } else {
        interaction.reply({ ephemeral: true, content: lang.GLOBAL.ERROR });
      }
    }
  }

  isSubCommandDisabled(dbGuild: IGuild, interaction: DJS.CommandInteraction) {
    const commands = dbGuild.disabled_commands;

    const command = this.getCommandName(interaction);

    return commands.includes(command);
  }

  getCommandName(interaction: DJS.CommandInteraction) {
    let command: string;

    try {
      const sub = interaction.options.getSubcommand();
      command = `${interaction.commandName}-${sub}`;
    } catch {
      command = interaction.commandName;
    }

    return command;
  }
}
