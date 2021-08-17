import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class ServerIconCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "util",
      name: "server-icon",
      description: "View the icon of the current guild",
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const icon = interaction.guild?.iconURL({ dynamic: true, size: 2048 });

    if (!icon) {
      await interaction.reply({ content: lang.UTIL.NO_GUILD_ICON });
    } else {
      const embed = this.bot.utils.baseEmbed(interaction).setImage(icon);

      await interaction.reply({ embeds: [embed] });
    }
  }
}
