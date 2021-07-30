import { Message } from "discord.js";
import Bot from "./Bot";

export type CommandCategories =
  | "admin"
  | "animal"
  | "economy"
  | "games"
  | "image"
  | "levels"
  | "music"
  | "util"
  | "exempt"
  /**
   * @deprecated use `bot-owner` instead
   */
  | "botowner"
  | "giveaway"
  | "reactions"
  | "reminder"
  | "ticket"
  | "disabled"
  | "custom"
  | "information"
  | "bot-owner";

export interface RequiredArg {
  type?: "time" | "number";
  name: string;
}
export interface CommandOptions {
  name: string;
  description?: string;
  category: CommandCategories;
  usage?: string;
  cooldown?: number;

  typing?: boolean;
  aliases?: string[];
  requiredArgs?: RequiredArg[];
  options?: string[];

  memberPermissions?: bigint[];
  botPermissions?: bigint[];

  ownerOnly?: boolean;
}

export default abstract class Command {
  bot: Bot;
  name: string;
  options: CommandOptions;

  constructor(bot: Bot, options: CommandOptions) {
    this.bot = bot;
    this.name = options.name;
    this.options = options;

    this.execute = this.execute.bind(this);
  }

  /**
   * @param {Message} message discord.js message
   * @param {string[]} args message args. A string, numbers, Snowflakes, etc can be parsed.
   * @returns {any}
   */
  abstract execute(message: Message, args: any[]): Promise<any>;
}
