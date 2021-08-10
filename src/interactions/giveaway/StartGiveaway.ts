import * as DJS from "discord.js";
import ms from "ms";
import { Bot } from "structures/Bot";
import { ValidateReturn } from "structures/Command/Command";
import { SubCommand } from "structures/Command/SubCommand";

export default class StartGiveaway extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "giveaway",
      name: "start",
      description: "Start a new giveaway",
      options: [
        {
          name: "time",
          type: "STRING",
          description: "When the giveaway should end",
          required: true,
        },
        {
          name: "prize",
          type: "STRING",
          description: "The giveaway prize",
          required: true,
        },
        {
          name: "winner-count",
          type: "NUMBER",
          description: "The amount of people that can win (Default: 1)",
        },
      ],
    });
  }

  async validate(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ): Promise<ValidateReturn> {
    const perms = this.bot.utils.formatMemberPermissions(
      [DJS.Permissions.FLAGS.MANAGE_GUILD],
      interaction,
      lang,
    );

    if (perms) {
      return { ok: false, error: { content: perms, ephemeral: true } };
    }

    return { ok: true };
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const time = interaction.options.getString("time", true);
    const prize = interaction.options.getString("prize", true);
    const winnerCount = interaction.options.getNumber("winner-count") ?? 1;

    if (!ms(time)) {
      return interaction.reply({ ephemeral: true, content: lang.MESSAGE.MUST_BE_DATE });
    }

    await this.bot.giveawayManager.start(interaction.channel as any, {
      time: ms(time),
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
