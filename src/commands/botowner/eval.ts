import { Message } from "discord.js";
import { codeBlock, inlineCode } from "@discordjs/builders";
import { inspect } from "util";
import Command from "structures/Command";
import Bot from "structures/Bot";

const classified = [
  "this.bot.config",
  "this.bot.token",
  "process.env",
  // eslint-disable-next-line quotes
  'bot["token"]',
  "bot['token']",
];

export default class EvalCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "eval",
      description: "Eval",
      category: "botowner",
      ownerOnly: true,
      aliases: ["e"],
      requiredArgs: [{ name: "text" }],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    const toEval = args.join(" ");
    let wasCanceled = false;

    classified.forEach((item) => {
      if (toEval.toLowerCase().includes(item)) {
        message.channel.send({
          content: "That operation was canceled because it can include tokens or secrets.",
        });
        return (wasCanceled = true);
      }
    });

    if (wasCanceled) return;

    try {
      let evaluatedCode = await eval(toEval);
      const typeOf = typeof evaluatedCode;

      evaluatedCode = inspect(evaluatedCode, {
        depth: 0,
        maxArrayLength: null,
      });

      const type = typeOf[0].toUpperCase() + typeOf.slice(1);

      const embed = this.bot.utils.baseEmbed(message).setTitle(lang.BOT_OWNER.EVAL)
        .setDescription(`\`${lang.BOT_OWNER.EVAL_TYPE}:\` ${type}
${inlineCode(lang.BOT_OWNER.EVAL_INPUT)}: ${codeBlock("js", toEval)}
${inlineCode(lang.BOT_OWNER.EVAL_OUTPUT)}: ${codeBlock("js", toEval)}`);

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      const errorEmbed = this.bot.utils
        .baseEmbed(message)
        .setTitle(lang.GLOBAL.ERROR)
        .setDescription(codeBlock(error));

      message.channel.send({ embeds: [errorEmbed] });
    }
  }
}
