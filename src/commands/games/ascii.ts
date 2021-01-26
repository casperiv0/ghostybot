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
      requiredArgs: [{ name: "text" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    try {
      const text = args.join(" ");

      figlet.text(text, (e, txt) => {
        if (e) return;
        message.channel.send(`\`\`\` ${txt?.trimRight()} \`\`\``);
      });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
