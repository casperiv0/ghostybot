import * as DJS from "discord.js";
import fetch from "node-fetch";
import { Bot } from "structures/Bot";
import { ValidateReturn } from "structures/Command/Command";
import { SubCommand } from "structures/Command/SubCommand";

const API_URL = "https://some-random-api.ml/img/pikachu";

export default class PikachuCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "image",
      name: "pikachu",
      description: "Returns an image of a pikachu",
    });
  }

  async validate(): Promise<ValidateReturn> {
    return { ok: true };
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    await interaction.deferReply();

    const data = await fetch(API_URL).then((res) => res.json());

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.link})`)
      .setImage(data.link);

    await interaction.editReply({ embeds: [embed] });
  }
}
