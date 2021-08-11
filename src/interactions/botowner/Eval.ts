import * as DJS from "discord.js";
import { codeBlock, inlineCode } from "@discordjs/builders";
import { inspect } from "util";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";
import { ValidateReturn } from "structures/Command/Command";

const classified = [
  "this.bot.config",
  "this.bot.token",
  "process.env",
  // eslint-disable-next-line quotes
  'bot["token"]',
  "bot['token']",
];

export default class Eval extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      name: "eval",
      description: "Execute a piece of code",
      commandName: "bot-owner",
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

  async validate(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ): Promise<ValidateReturn> {
    const owners = process.env["OWNERS"];
    const isOwner = owners?.includes(interaction.user.id);

    if (!isOwner) {
      return { ok: false, error: { ephemeral: true, content: lang.MESSAGE.OWNER_ONLY } };
    }

    return { ok: true };
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    try {
      await interaction.deferReply();
      const code = interaction.options.getString("code", true);
      let wasCanceled = false;

      classified.forEach((item) => {
        if (code.toLowerCase().includes(item)) {
          wasCanceled = true;
        }
      });

      if (wasCanceled) {
        return interaction.editReply({
          content: "That operation was canceled because it can include tokens or secrets.",
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

      await interaction.editReply({ embeds: [embed] });
    } catch (err) {
      const embed = this.bot.utils
        .baseEmbed(interaction)
        .setTitle(lang.GLOBAL.ERROR)
        .setDescription(codeBlock(err));

      return interaction.editReply({ embeds: [embed] });
    }
  }
}
