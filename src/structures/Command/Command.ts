import * as DJS from "discord.js";
import { Bot } from "structures/Bot";

export type ValidateReturn = {
  ok: boolean;
  error?:
    | DJS.MessagePayload
    | DJS.InteractionReplyOptions
    | (DJS.InteractionReplyOptions & { fetchReply: true });
};

export interface CommandOptions {
  name: string;
  description: string;
  options?: DJS.ApplicationCommandOptionData[];
}

export abstract class Command {
  bot: Bot;
  name: string;
  _options: CommandOptions;

  constructor(bot: Bot, options: CommandOptions) {
    this.bot = bot;
    this.name = options.name;
    this._options = options;
  }

  get options(): CommandOptions {
    return {
      ...this._options,
    };
  }

  abstract validate(interaction: DJS.CommandInteraction): Promise<ValidateReturn>;

  abstract execute(interaction: DJS.CommandInteraction): Promise<unknown>;
}
