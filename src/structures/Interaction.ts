import { ApplicationCommandOptionData, Interaction as DiscordInteraction } from "discord.js";
import Bot from "./Bot";
import { CommandCategories } from "./Command";

export interface InteractionOptions {
  name: string;
  description: string;
  category: CommandCategories;
  options?: ApplicationCommandOptionData[];

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
  abstract execute(message: DiscordInteraction): Promise<void>;
}
