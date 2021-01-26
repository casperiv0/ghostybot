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
      requiredArgs: [{ name: "text" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    try {
      const text = args.join(" ");

      message.channel.send(`\`\`\` ${cowSay.say({ text, T: "U", e: "oO" })} \`\`\``);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
