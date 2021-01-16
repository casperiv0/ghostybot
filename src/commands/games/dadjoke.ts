import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class DadJokeCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "dadjoke",
      description: "Shows a dadjoke",
      category: "games",
    });
  }

  async execute(bot: Bot, message: Message) {
    const data = await fetch("https://icanhazdadjoke.com/slack").then((res) => res.json());

    message.channel.send(data.attachments[0].fallback);
  }
}
