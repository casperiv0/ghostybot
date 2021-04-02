import ch from "child_process";
import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class ShellCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "shell",
      description: "Execute shell commands",
      category: "botowner",
      requiredArgs: [{ name: "code" }],
      ownerOnly: true,
      aliases: ["cmd"],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    try {
      const stdout = ch.execSync(args.join(" "));

      return message.channel.send(stdout, {
        code: true,
      });
    } catch (err) {
      const errorEmbed = bot.utils
        .baseEmbed(message)
        .setTitle(lang.GLOBAL.ERROR)
        .setDescription(`\`\`\`${err}\`\`\``);

      message.channel.send(errorEmbed);
    }
  }
}
