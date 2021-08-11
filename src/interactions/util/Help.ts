import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { hyperlink } from "@discordjs/builders";
import { Command, ValidateReturn } from "structures/Command/Command";

export default class HelpInteraction extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "help",
      description: "Return more information about a command",
    });
  }

  async validate(): Promise<ValidateReturn> {
    return { ok: true };
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    try {
      const url = "https://github.com/Dev-CasperTheGhost/ghostybot/blob/main/docs/COMMANDS.md";
      const LINK = hyperlink(lang.HELP.CLICK_ME, url);

      const embed = this.bot.utils
        .baseEmbed({
          author: interaction.user,
        })
        .setDescription(
          `You can view all the slash commands [here](${url}). Due to some limitations it is hard to implement a new help command within Discord`,
        )
        .addField(lang.HELP.FULL_CMD_LIST, LINK);

      return interaction.reply({ embeds: [embed] });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return interaction.reply({ content: lang.GLOBAL.ERROR, ephemeral: true });
    }
  }
}
