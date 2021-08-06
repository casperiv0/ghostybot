import * as DJS from "discord.js";
import { parse } from "twemoji-parser";
import { Bot } from "structures/Bot";

export async function stealEmoji(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const perms = bot.utils.formatMemberPermissions(
    [DJS.Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS],
    interaction,
    lang,
  );
  if (perms) {
    return interaction.reply({ content: perms, ephemeral: true });
  }

  const botPerms = bot.utils.formatBotPermissions(
    [DJS.Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS],
    interaction,
    lang,
  );
  if (botPerms) {
    return interaction.reply({ embeds: [botPerms], ephemeral: true });
  }

  const emoji = interaction.options.getString("emoji", true);
  const name = interaction.options.getString("name", true);

  if (emoji.startsWith("https://cdn.discordapp.com/emojis/")) {
    await interaction.guild?.emojis.create(emoji, name);

    const embed = bot.utils
      .baseEmbed(interaction)
      .setTitle(lang.ADMIN.EMOJI_ADDED)
      .setDescription(`${lang.ADMIN.EMOJI_ADDED_NAME} ${name}`);

    return interaction.reply({ embeds: [embed] });
  }

  const customEmoji = DJS.Util.parseEmoji(emoji);

  if (customEmoji?.id) {
    const link = `https://cdn.discordapp.com/emojis/${customEmoji.id}.${
      customEmoji?.animated ? "gif" : "png"
    }`;

    const error = await createEmoji(interaction, link, name);
    if (error) {
      return interaction.reply({
        ephemeral: true,
        content: error,
      });
    }

    const embed = bot.utils
      .baseEmbed(interaction)
      .setTitle(lang.ADMIN.EMOJI_ADDED)
      .setDescription(
        `${lang.ADMIN.EMOJI_ADDED_NAME} ${name} | ${lang.ADMIN.PREVIEW} [${lang.HELP.CLICK_ME}](${link})`,
      );

    return interaction.reply({ embeds: [embed] });
  }

  const foundEmoji = parse(emoji, { assetType: "png" });
  if (!foundEmoji[0]) {
    return interaction.reply({
      ephemeral: true,
      content: lang.ADMIN.PROVIDE_VALID_EMOJI,
    });
  }

  return interaction.reply({
    ephemeral: true,
    content: lang.ADMIN.USE_NORMAL_EMOJI,
  });

  async function createEmoji(interaction: DJS.CommandInteraction, url: string, name: string) {
    try {
      await interaction.guild?.emojis.create(url, name);
    } catch (e) {
      if (String(e).includes("DiscordAPIError: Maximum number of emojis reached")) {
        return lang.ADMIN.MAX_EMOJI;
      }
    }
  }
}
