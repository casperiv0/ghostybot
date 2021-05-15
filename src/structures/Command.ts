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
  | "botowner"
  | "giveaway"
  | "reactions"
  | "reminder"
  | "ticket"
  | "disabled"
  | "custom";

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

  aliases?: string[];
  requiredArgs?: RequiredArg[];
  options?: string[];

  memberPermissions?: bigint[];
  botPermissions?: bigint[];

  ownerOnly?: boolean;
}

export default class Command {
  bot: Bot;
  name: string;
  options: CommandOptions;

  constructor(bot: Bot, options: CommandOptions) {
    this.bot = bot;
    this.name = options.name;
    this.options = options;
  }

  /**
   * @param {Message} message discord.js message
   * @param {string[]} args message args
   * @returns {any}
   */

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async execute(message: Message, args: string[]): Promise<any> {
    message;
    args;
  }
}
