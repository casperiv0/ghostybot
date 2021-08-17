import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

interface Field {
  name: string;
  value: string;
}

export default class RolesCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "util",
      name: "roles",
      description: "View all roles in this guild",
    });
  }

  async execute(interaction: DJS.CommandInteraction) {
    const roles = [...(interaction.guild?.roles.cache ?? new DJS.Collection()).values()];

    if (roles.length <= 0) {
      return interaction.reply({ ephemeral: true, content: "This guild does not have any roles" });
    }

    const embed = this.bot.utils.baseEmbed(interaction);
    const fields: Field[] = [];

    for (let i = 0; i < roles.length; i++) {
      if (i % 15 === 0) {
        const r = roles.slice(i, i + 15);

        fields.push({ name: `Page ${fields.length + 1}`, value: r.join(" ") });
      }
    }

    embed.addFields(fields);

    await interaction.reply({ embeds: [embed] });
  }
}
