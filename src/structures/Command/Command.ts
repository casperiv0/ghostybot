import { BaseCommand, BaseCommandOptions } from "./BaseCommand";

export abstract class Command extends BaseCommand {
  get options(): BaseCommandOptions {
    return {
      ...this._options,
    };
  }
}
