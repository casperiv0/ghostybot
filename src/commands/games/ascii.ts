import { Message } from "discord.js";
import figlet from "figlet";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class AsciiCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "ascii",
      description: "Transform text to ascii",
      category: "games",
      requiredArgs: ["text"],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const text = args.join(" ");

    figlet.text(text, (e, txt) => {
      if (e) return;
      message.channel.send(`\`\`\` ${txt?.trimRight()} \`\`\``);
    });
  }
}
