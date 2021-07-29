import { CommandInteraction } from "discord.js";
import { codeBlock, inlineCode } from "@discordjs/builders";
import { inspect } from "util";
import Bot from "structures/Bot";
import Interaction from "structures/Interaction";

const classified = [
  "this.bot.config",
  "this.bot.token",
  "process.env",
  // eslint-disable-next-line quotes
  'bot["token"]',
  "bot['token']",
];

export default class EvalCommand extends Interaction {
  constructor(bot: Bot) {
    // todo: look into permissions?
    super(bot, {
      name: "eval",
      description: "Execute a piece of code",
      category: "bot-owner",
      ownerOnly: true,
      options: [
        {
          type: "STRING",
          name: "code",
          description: "The code you want to execute",
          required: true,
        },
      ],
    });
  }

  async execute(interaction: CommandInteraction) {
    const lang = await this.bot.utils.getGuildLang(interaction.guild?.id);

    try {
      const code = interaction.options.getString("code", true);
      let wasCanceled = false;

      classified.forEach((item) => {
        if (code.toLowerCase().includes(item)) {
          wasCanceled = true;
        }
      });

      if (wasCanceled) {
        return interaction.reply({
          content: "That operation was canceled because it can include tokens or secrets.",
          ephemeral: true,
        });
      }

      let evaluatedCode = await eval(code);
      const typeOf = typeof evaluatedCode;

      evaluatedCode = inspect(evaluatedCode, {
        depth: 0,
        maxArrayLength: null,
      });

      const type = typeOf[0].toUpperCase() + typeOf.slice(1);

      const embed = this.bot.utils.baseEmbed(interaction).setTitle(lang.BOT_OWNER.EVAL)
        .setDescription(`
${inlineCode(lang.BOT_OWNER.EVAL_TYPE)}: ${type}
${inlineCode(lang.BOT_OWNER.EVAL_INPUT)}: ${codeBlock("js", code)}
${inlineCode(lang.BOT_OWNER.EVAL_OUTPUT)}: ${codeBlock("js", evaluatedCode)}`);

      await interaction.reply({ embeds: [embed] });
    } catch (err) {
      const embed = this.bot.utils
        .baseEmbed(interaction)
        .setTitle(lang.GLOBAL.ERROR)
        .setDescription(codeBlock(err));

      return interaction.reply({ embeds: [embed] });
    }
  }
}
