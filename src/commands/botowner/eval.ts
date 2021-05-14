import { Message } from "discord.js";
import { inspect } from "util";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

// eslint-disable-next-line quotes
const classified = ["this.bot.config", "this.bot.token", "process.env", 'bot["token"]', "bot['token']"];

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
        message.channel.send(
          "That operation was canceled because it can include tokens or secrets.",
        );
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
\`${lang.BOT_OWNER.EVAL_INPUT}:\` \`\`\`js\n${toEval} \`\`\`
\`${lang.BOT_OWNER.EVAL_OUTPUT}:\` \`\`\`js\n${evaluatedCode}\`\`\``);

      message.channel.send(embed);
    } catch (error) {
      const errorEmbed = this.bot.utils
        .baseEmbed(message)
        .setTitle(lang.GLOBAL.ERROR)
        .setDescription(`\`\`\`${error}\`\`\``);

      message.channel.send(errorEmbed);
    }
  }
}
