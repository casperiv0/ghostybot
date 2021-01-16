import { Message, MessageAttachment } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class SupremeCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "supreme",
      description: "Display custom text as the Supreme logo",
      category: "image",
      requiredArgs: ["text"],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const text = args.join(" ");

    const image = await bot.alexClient.image.supreme({
      text: encodeURIComponent(text),
    });

    const att = new MessageAttachment(image, "supreme.png");

    message.channel.send(att);
  }
}
