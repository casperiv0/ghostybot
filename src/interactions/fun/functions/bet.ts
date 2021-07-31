import * as DJS from "discord.js";
import Bot from "structures/Bot";

export async function bet(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const user = interaction.options.getUser("user", true);

  const number = Math.random();

  const embed = bot.utils
    .baseEmbed(interaction)
    .setTitle(
      lang.GAMES.BETS_ON.replace("{member_1}", interaction.user.username).replace(
        "{member_2}",
        user.username,
      ),
    )
    .setDescription(
      number > 0.5
        ? lang.GAMES.WON_BET.replace("{member_1}", interaction.user.username)
            .replace("{member_2}", user.username)
            .replace("{member_1}", interaction.user.username)
        : lang.GAMES.LOST_BET.replace("{member_1}", interaction.user.username)
            .replace("{member_2}", user.username)
            .replace("{member_1}", interaction.user.username),
    );

  await interaction.reply({ embeds: [embed] });
}
