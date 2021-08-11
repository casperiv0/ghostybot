import * as DJS from "discord.js";
import { ApplicationCommandOptionTypes } from "discord.js/typings/enums";
import { Bot } from "structures/Bot";
import { CommandOptions, ValidateReturn } from "structures/Command/Command";

export interface SubCommandOptions extends CommandOptions {
  /** top level command name (/top-level \<sub command\>) */
  commandName: string;

  /** the SUB_COMMAND_GROUP name */
  groupName?: string;
}

export abstract class SubCommand {
  bot: Bot;
  name: string;
  private _options: SubCommandOptions;

  constructor(bot: Bot, options: SubCommandOptions) {
    this.bot = bot;
    this.name = options.name;
    this._options = options;

    this.validate = this.validate.bind(this);
    this.execute = this.execute.bind(this);
  }

  get options(): SubCommandOptions & {
    type: DJS.ApplicationCommandOptionType | ApplicationCommandOptionTypes;
  } {
    return {
      type: "SUB_COMMAND",
      ...this._options,
    };
  }

  abstract validate(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ): Promise<ValidateReturn>;

  abstract execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ): Promise<unknown>;
}
