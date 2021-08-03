import { ApplicationCommandOptionData, Interaction as DiscordInteraction } from "discord.js";
import Bot from "./Bot";

export type InteractionCategories =
  | "animal"
  | "fun"
  | "economy"
  | "bot-owner"
  | "reminder"
  | "ticket"
  | "information"
  | "music"
  | "giveaway"
  | "util"
  | "image"
  | "anime"
  | "levels";

export interface InteractionOptions {
  name: string;
  description: string;
  category: InteractionCategories;
  options?: ApplicationCommandOptionData[];

  memberPermissions?: bigint[];
  botPermissions?: bigint[];

  ownerOnly?: boolean;
}

export default abstract class Interaction {
  bot: Bot;
  name: string;
  options: InteractionOptions;

  constructor(bot: Bot, options: InteractionOptions) {
    this.bot = bot;
    this.name = options.name;
    this.options = options;

    this.execute = this.execute.bind(this);
  }

  /**
   * @param {Message} message discord.js message
   * @returns {any}
   */
  abstract execute(message: DiscordInteraction): Promise<any>;
}
