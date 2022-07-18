import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class BetCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "fun",
      name: "bet",
      description: "Bet on somebody",
      options: [
        {
          description: "The user you want to bet on",
          name: "user",
          type: DJS.ApplicationCommandOptionType.User,
          required: true,
        },
      ],
    });
  }

  async execute(
    interaction: DJS.ChatInputCommandInteraction<"cached" | "raw">,
    lang: typeof import("@locales/english").default,
  ) {
    const user = interaction.options.getUser("user", true);

    const number = Math.random();

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(
        this.bot.utils.translate(lang.GAMES.BETS_ON, {
          member_1: interaction.user.username,
          member_2: user.username,
        }),
      )
      .setDescription(
        number > 0.5
          ? this.bot.utils.translate(lang.GAMES.WON_BET, {
              member_1: interaction.user.username,
              member_2: user.username,
            })
          : this.bot.utils.translate(lang.GAMES.LOST_BET, {
              member_1: interaction.user.username,
              member_2: user.username,
            }),
      );

    await interaction.reply({ embeds: [embed] });
  }
}
