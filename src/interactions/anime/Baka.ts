import { hyperlink } from "@discordjs/builders";
import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { ValidateReturn } from "structures/Command/Command";
import { SubCommand } from "structures/Command/SubCommand";

export default class BakaCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "anime",
      name: "baka",
      description: "Baka?",
    });
  }

  async validate(): Promise<ValidateReturn> {
    return { ok: true };
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const data = await this.bot.neko.sfw.baka();
    const link = hyperlink(lang.IMAGE.CLICK_TO_VIEW, data.url);

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setDescription(link)
      .setImage(`${data.url}`);

    await interaction.reply({ embeds: [embed] });
  }
}
