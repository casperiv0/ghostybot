import Bot from "./Bot";

export default class Feature {
  bot: Bot;
  name: string;

  constructor(bot: Bot, name: string) {
    this.bot = bot;
    this.name = name;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async execute(): Promise<any> {
    undefined;
  }
}
