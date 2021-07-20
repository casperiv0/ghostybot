import Bot from "./Bot";

export default abstract class Feature {
  bot: Bot;
  name: string;

  constructor(bot: Bot, name: string) {
    this.bot = bot;
    this.name = name;

    this.execute = this.execute.bind(this);
  }

  abstract execute(): Promise<any>;
}
