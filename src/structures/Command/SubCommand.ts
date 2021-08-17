import { BaseCommand, BaseCommandOptions } from "./BaseCommand";

export interface SubCommandOptions extends BaseCommandOptions {
  /** top level command name (/top-level \<sub command\>) */
  commandName: string;

  /** the SUB_COMMAND_GROUP name */
  groupName?: string;
}

export abstract class SubCommand extends BaseCommand<SubCommandOptions> {
  get options(): SubCommandOptions & {
    type: "SUB_COMMAND";
  } {
    return {
      type: "SUB_COMMAND",
      ...this._options,
    };
  }
}
