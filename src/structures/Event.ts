import Bot from "./Bot";

export default class Event {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async execute(bot: Bot, ...args: any): Promise<any> {
    bot;
    args;
  }
}
