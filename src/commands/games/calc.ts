import { Message } from "discord.js";
import { create, all } from "mathjs";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";
const math = create(all);

export default class CalcCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "calc",
      description: "Calculate something",
      category: "games",
      aliases: ["math"],
      requiredArgs: [{ name: "calculation" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const calculation = math?.evaluate?.(args.join(" "));

      const embed = bot.utils
        .baseEmbed(message)
        .setTitle(lang.GAMES.CALC)
        .addField(`${lang.BOT_OWNER.EVAL_INPUT}:`, `\`\`\`js\n${args.join(" ")}\`\`\``)
        .addField(`${lang.BOT_OWNER.EVAL_OUTPUT}:`, `\`\`\`js\n${calculation}\`\`\``);

      message.channel.send(embed);
    } catch (e) {
      return message.channel.send(lang.GAMES.INVALID_CALC);
    }
  }
}
