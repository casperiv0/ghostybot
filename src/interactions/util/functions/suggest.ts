import * as DJS from "discord.js";
import { hyperlink } from "@discordjs/builders";
import { Bot } from "structures/Bot";

export async function suggest(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const suggestion = interaction.options.getString("text", true);
  const guild = await bot.utils.getGuildById(interaction.guildId!);
  const suggestChannel = guild?.suggest_channel;

  if (!suggestChannel) {
    return interaction.reply({ ephemeral: true, content: lang.UTIL.NO_SUGG_CHANNEL });
  }

  const embed = bot.utils
    .baseEmbed(interaction)
    .setTitle(lang.UTIL.NEW_SUGGESTION)
    .setDescription(suggestion)
    .setAuthor(lang.UTIL.CREATED_BY.replace("{member}", interaction.user.tag));

  const channel = bot.channels.cache.get(suggestChannel);
  if (!channel) return;
  const sendMessage = await (channel as DJS.TextChannel).send({ embeds: [embed] });

  sendMessage.react("👍");
  sendMessage.react("👎");

  const url = hyperlink(lang.UTIL.SENT_SUG, sendMessage.url);

  await interaction.reply({ ephemeral: true, content: url });
}
