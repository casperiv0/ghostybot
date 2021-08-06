import * as DJS from "discord.js";
import { Bot } from "structures/Bot";

export async function rank(
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

  const level = bot.utils.calculateXp(dbUser.xp);
  const avatar = encodeURIComponent(user.displayAvatarURL());

  const url = `https://vacefron.nl/api/rankcard?username=${encodeURIComponent(
    user.username,
  )}&avatar=${avatar}&level=${level}&rank=${level}&currentxp=${dbUser.xp}&nextlevelxp=${
    dbUser.xp + 1200
  }&previouslevelxp=${dbUser.xp}&custombg=2F3136&xpcolor=fff`;

  const attach = new DJS.MessageAttachment(url, "rank.png");

  await interaction.reply({
    files: [attach],
  });
}
