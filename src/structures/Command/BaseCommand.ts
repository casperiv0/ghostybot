import { APIs } from "@config/APIs";
import * as DJS from "discord.js";
import { Bot } from "structures/Bot";

export interface BaseCommandOptions {
  /** the name of the command */
  name: string;

  /** the description of the command */
  description: string;

  /** the required permissions needed for the `interaction.member` */
  readonly memberPermissions?: bigint[];

  /** the required permissions needed for the bot */
  readonly botPermissions?: bigint[];

  /** options for the command, choices, required, add more options, etc.  */
  options?: (DJS.ApplicationCommandOption | DJS.ApplicationCommandOptionData)[];
}

export type ValidateReturn = {
  /** whether or not the validation was ok */
  ok: boolean;

  /** if the validation was **not** ok, include an error */
  error?: DJS.MessagePayload | DJS.InteractionReplyOptions;
};

export abstract class BaseCommand<TOptions extends BaseCommandOptions = BaseCommandOptions> {
  protected _options: TOptions;
  public bot: Bot;
  public name: string;
  public APIs: typeof APIs = APIs;

  constructor(bot: Bot, options: TOptions) {
    this.bot = bot;
    this.name = options.name;
    this._options = options;

    this.validate = this.validate?.bind(this);
    this.execute = this.execute.bind(this);
  }

  get options(): TOptions {
    return this._options;
  }

  validate?(
    interaction: DJS.ChatInputCommandInteraction<"cached" | "raw">,
    lang: typeof import("@locales/english").default,
  ): Promise<ValidateReturn>;

  abstract execute(
    interaction: DJS.ChatInputCommandInteraction<"cached" | "raw">,
    lang: typeof import("@locales/english").default,
  ): Promise<unknown>;
}
