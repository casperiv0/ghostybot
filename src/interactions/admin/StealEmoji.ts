import * as DJS from "discord.js";
import { parse } from "twemoji-parser";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class StealEmojiCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "admin",
      name: "steal-emoji",
      description: "Add an emoji from a different guild to this guild",
      botPermissions: [DJS.Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS],
      memberPermissions: [DJS.Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS],
      options: [
        {
          name: "emoji",
          type: "STRING",
          required: true,
          description: "The emoji you want to add",
        },
        {
          name: "name",
          type: "STRING",
          required: true,
          description: "The name of the emoji",
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const emoji = interaction.options.getString("emoji", true);
    const name = interaction.options.getString("name", true);

    if (emoji.startsWith("https://cdn.discordapp.com/emojis/")) {
      await interaction.guild?.emojis.create(emoji, name);

      const embed = this.bot.utils
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

      const error = await this.createEmoji(interaction, link, name, lang);
      if (error) {
        return interaction.reply({
          ephemeral: true,
          content: error,
        });
      }

      const embed = this.bot.utils
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

    await interaction.reply({
      ephemeral: true,
      content: lang.ADMIN.USE_NORMAL_EMOJI,
    });
  }

  async createEmoji(interaction: DJS.CommandInteraction, url: string, name: string, lang: any) {
    try {
      await interaction.guild?.emojis.create(url, name);
    } catch (e) {
      if (String(e).includes("DiscordAPIError: Maximum number of emojis reached")) {
        return lang.ADMIN.MAX_EMOJI;
      }
    }
  }
}
