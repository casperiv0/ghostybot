import Bot from "./Bot";

export default abstract class Event {
  bot: Bot;
  name: string;

  constructor(bot: Bot, name: string) {
    this.bot = bot;
    this.name = name;
  }

  /**
   *
   * @param {Bot} bot bot
   */
  abstract execute(bot: Bot, ...args: any): Promise<any>;
}
