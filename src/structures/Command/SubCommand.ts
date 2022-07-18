import { BaseCommand, BaseCommandOptions } from "./BaseCommand";
import * as DJS from "discord.js";

export interface SubCommandOptions extends BaseCommandOptions {
  /** top level command name (/top-level \<sub command\>) */
  commandName: string;

  /** the SUB_COMMAND_GROUP name */
  groupName?: string;
}

export abstract class SubCommand extends BaseCommand<SubCommandOptions> {
  get options(): SubCommandOptions & {
    type: DJS.ApplicationCommandOptionType.Subcommand;
  } {
    return {
      type: DJS.ApplicationCommandOptionType.Subcommand,
      ...this._options,
    };
  }
}
