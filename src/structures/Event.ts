import { Bot } from "./Bot";

export abstract class Event {
  bot: Bot;
  name: string;

  constructor(bot: Bot, name: string) {
    this.bot = bot;
    this.name = name;

    this.execute = this.execute.bind(this);
  }

  /**
   * @param {Bot} bot bot
   */
  abstract execute(bot: Bot, ...args: any[]): Promise<any>;
}
