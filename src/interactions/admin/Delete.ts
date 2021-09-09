import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class DeleteCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "admin",
      name: "delete",
      description: "Delete up to 100 messages within 14 days",
      botPermissions: [DJS.Permissions.FLAGS.MANAGE_MESSAGES],
      memberPermissions: [DJS.Permissions.FLAGS.MANAGE_MESSAGES],
      options: [
        {
          name: "amount",
          description: "Min: 1. Max: 100",
          type: "INTEGER",
          required: true,
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const amount = interaction.options.getInteger("amount", true);

    if (amount < 1 || amount > 100) {
      return interaction.reply({
        ephemeral: true,
        content: lang.ADMIN.DELETE_PROVIDE_AMOUNT,
      });
    }

    await interaction.reply({
      ephemeral: true,
      content: lang.ADMIN.DELETE_DELETED.replace("{amount}", amount.toString()),
    });

    await (interaction.channel as any)?.bulkDelete(amount);
  }
}
