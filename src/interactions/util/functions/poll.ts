import { Bot } from "structures/Bot";
import * as DJS from "discord.js";

export async function poll(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const question = interaction.options.getString("question", true);

  const embed = bot.utils
    .baseEmbed(interaction)
    .setAuthor(lang.UTIL.CREATED_BY.replace("{member}", interaction.user.tag))
    .setDescription(question);

  embed.footer = null;

  const sentMessage = await interaction.reply({ fetchReply: true, embeds: [embed] });

  if (sentMessage instanceof DJS.Message) {
    sentMessage.react("👍");
    sentMessage.react("👎");
    sentMessage.react("🤷");
  } else {
    interaction.editReply({ content: lang.GLOBAL.ERROR });
  }
}
