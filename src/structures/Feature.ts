import Bot from "./Bot";

export default class Feature {
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
  async execute(bot: Bot, ...args: any): Promise<any> {}
}
