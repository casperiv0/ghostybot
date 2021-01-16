import { Message } from "discord.js";
import cowSay from "cowsay";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class CowSayCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "cowsay",
      description: "Let a cow say something",
      usage: "<text>",
      category: "animal",
      requiredArgs: ["text"],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const text = args.join(" ");

    message.channel.send(`\`\`\` ${cowSay.say({ text, T: "U", e: "oO" })} \`\`\``);
  }
}
