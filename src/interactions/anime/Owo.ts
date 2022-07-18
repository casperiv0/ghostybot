import * as DJS from "discord.js";
import { hyperlink } from "@discordjs/builders";
import { request } from "undici";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class OwoCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "anime",
      name: "owo",
      description: "OwO",
    });
  }

  async execute(
    interaction: DJS.ChatInputCommandInteraction<"cached" | "raw">,
    lang: typeof import("@locales/english").default,
  ) {
    const data = (await request(this.APIs.Owo).then((res) => res.body.json())) as { path: string };

    const link = hyperlink(
      lang.IMAGE.CLICK_TO_VIEW,
      `https://cdn.ram.moe/${data.path.replace("/i/", "")}`,
    );

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setDescription(link)
      .setImage(`https://cdn.ram.moe/${data.path.replace("/i/", "")}`);

    await interaction.reply({ embeds: [embed] });
  }
}
