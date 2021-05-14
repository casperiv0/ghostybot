import { Message, MessageAttachment, Permissions } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class SupremeCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "supreme",
      description: "Display custom text as the Supreme logo",
      category: "image",
      requiredArgs: [{ name: "text" }],
      botPermissions: [Permissions.FLAGS.ATTACH_FILES],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);

    try {
      const text = args.join(" ");

      const image = await this.bot.alexClient.image.supreme({
        text: encodeURIComponent(text),
      });

      const att = new MessageAttachment(image, "supreme.png");

      message.channel.send(att);
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
