import * as DJS from "discord.js";
import Bot from "structures/Bot";

export async function inventory(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const user = interaction.options.getUser("user") ?? interaction.user;
  if (user.bot) {
    return interaction.reply({ ephemeral: true, content: lang.MEMBER.BOT_DATA });
  }

  const dbUser = await bot.utils.getUserById(user.id, interaction.guildId!);
  if (!dbUser) {
    return interaction.reply({ ephemeral: true, content: lang.GLOBAL.ERROR });
  }

  const inventory = dbUser?.inventory;

  if (!inventory || !inventory?.[0]) {
    return interaction.reply({
      content: lang.ECONOMY.INV_EMPTY,
    });
  }

  const mapped = inventory?.map((item) => item).join(",\n ");

  const embed = bot.utils
    .baseEmbed(interaction)
    .setTitle(`${user.username} ${lang.ECONOMY.INVENTORY}`)
    .setDescription(`${mapped}`);

  interaction.reply({ embeds: [embed] });
}
