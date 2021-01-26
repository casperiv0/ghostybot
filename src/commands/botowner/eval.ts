import { Message } from "discord.js";
import { inspect } from "util";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

const classified = ["bot.config", "bot.token", "process.env"];

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

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    const toEval = args.join(" ");
    let wasCanceled = false;

    classified.forEach((item) => {
      if (toEval.toLowerCase().includes(item)) {
        message.channel.send(
          "That operation was canceled because it can include tokens or secrets."
        );
        return (wasCanceled = true);
      }
    });

    if (wasCanceled) return;

    try {
      let evaled = await eval(toEval);
      const eevaled = typeof evaled;
      evaled = inspect(evaled, {
        depth: 0,
        maxArrayLength: null,
      });
      const type = eevaled[0].toUpperCase() + eevaled.slice(1);

      const embed = bot.utils.baseEmbed(message).setTitle(lang.BOT_OWNER.EVAL)
        .setDescription(`\`${lang.BOT_OWNER.EVAL_TYPE}:\` ${type}
\`${lang.BOT_OWNER.EVAL_INPUT}:\` \`\`\`js\n${toEval} \`\`\`
\`${lang.BOT_OWNER.EVAL_OUTPUT}:\` \`\`\`js\n${evaled}\`\`\``);

      message.channel.send(embed);
    } catch (error) {
      const errorEmbed = bot.utils
        .baseEmbed(message)
        .setTitle(lang.GLOBAL.ERROR)
        .setDescription(`\`\`\`${error}\`\`\``);

      message.channel.send(errorEmbed);
    }
  }
}
