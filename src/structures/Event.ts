import { Bot } from "./Bot";

export abstract class Event {
  bot: Bot;
  name: string;
  once: boolean;

  constructor(bot: Bot, name: string, once = false) {
    this.bot = bot;
    this.name = name;
    this.once = once;

    this.execute = this.execute.bind(this);
  }

  /**
   * @param {Bot} bot bot
   */
  abstract execute(bot: Bot, ...args: any[]): Promise<any>;
}
