import * as DJS from "discord.js";
import ms from "ms";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class StartGiveaway extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "giveaway",
      name: "start",
      description: "Start a new giveaway",
      memberPermissions: [DJS.PermissionFlagsBits.ManageGuild],
      options: [
        {
          name: "time",
          type: DJS.ApplicationCommandOptionType.String,
          description: "When the giveaway should end",
          required: true,
        },
        {
          name: "prize",
          type: DJS.ApplicationCommandOptionType.String,
          description: "The giveaway prize",
          required: true,
        },
        {
          name: "winner-count",
          type: DJS.ApplicationCommandOptionType.Integer,
          description: "The amount of people that can win (Default: 1)",
        },
      ],
    });
  }

  async execute(
    interaction: DJS.ChatInputCommandInteraction<"cached" | "raw">,
    lang: typeof import("@locales/english").default,
  ) {
    const time = interaction.options.getString("time", true);
    const prize = interaction.options.getString("prize", true);
    const winnerCount = interaction.options.getInteger("winner-count") ?? 1;

    if (!ms(time)) {
      return interaction.reply({ ephemeral: true, content: lang.MESSAGE.MUST_BE_DATE });
    }

    await this.bot.giveawayManager.start(interaction.channel as DJS.TextChannel, {
      duration: ms(time),
      prize,
      winnerCount: +winnerCount,
      messages: {
        giveaway: lang.GIVEAWAY.NEW,
        giveawayEnded: lang.GIVEAWAY.ENDED,
      },
    });

    await interaction.reply({ content: lang.GIVEAWAY.STARTED, ephemeral: true });
  }
}
