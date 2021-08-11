import * as DJS from "discord.js";
import { roleMention, time } from "@discordjs/builders";
import { Bot } from "structures/Bot";
import { ValidateReturn } from "structures/Command/Command";
import { SubCommand } from "structures/Command/SubCommand";

export default class EmojiInfoCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "info",
      name: "emoji",
      description: "Get information about an emoji",
      options: [
        {
          description: "The emoji you want more information about",
          name: "emoji",
          required: true,
          type: "STRING",
        },
      ],
    });
  }

  async validate(): Promise<ValidateReturn> {
    return { ok: true };
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const emoji = interaction.options.getString("emoji", true);
    const foundEmoji = this.findEmoji(interaction.guild!, emoji);

    if (!foundEmoji) {
      return interaction.reply({
        content: lang.UTIL.EMOJI_NOT_FOUND,
      });
    }

    let emojiAuthor: string | null = null;

    try {
      emojiAuthor = await foundEmoji.fetchAuthor().then((v) => v.tag);
    } catch {
      emojiAuthor = lang.UTIL.INVALID_PERMS;
    }

    const accessibleBy =
      foundEmoji.roles.cache.map((r) => roleMention(r.id)).join(", ") || lang.GLOBAL.EVERYONE;

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(`${lang.UTIL.EMOJI_INFO}: ${foundEmoji}`)
      .setThumbnail(foundEmoji.url).setDescription(`
**${lang.GLOBAL.NAME}:** ${foundEmoji.name}
**ID:** ${foundEmoji.id}
**${lang.UTIL.CREATED_AT}:** ${time(new Date(foundEmoji.createdAt), "F")}
**${lang.UTIL.CREATED_BY.replace(" {member}", "")}:** ${emojiAuthor}
**${lang.UTIL.ACCESSIBLE_BY}:** ${accessibleBy}`);

    return interaction.reply({ embeds: [embed] });
  }

  findEmoji(guild: DJS.Guild, arg: string) {
    const regex = arg.replace(/^<a?:\w+:(\d+)>$/, "$1");
    return (
      guild.emojis.cache.find((emoji) => emoji.name === arg) ||
      guild.emojis.cache.find((emoji) => emoji.id === regex)
    );
  }
}