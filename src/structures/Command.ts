import { PermissionString, Message } from "discord.js";
import Bot from "./Bot";

export interface RequiredArg {
  type?: "time" | "number";
  name: string;
}
export interface CommandOptions {
  name: string;
  description?: string;
  category: string;
  usage?: string;
  cooldown?: number;

  aliases?: string[];
  requiredArgs?: RequiredArg[];
  options?: string[];

  memberPermissions?: PermissionString[];
  botPermissions?: PermissionString[];

  ownerOnly?: boolean;
  nsfwOnly?: boolean;
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
   * @param {Bot} bot bot
   * @param {Message} message discord.js message
   * @param {string[]} args message args
   * @returns {any}
   */
  async execute(bot: Bot, message: Message, args: string[]): Promise<any> {}
}
