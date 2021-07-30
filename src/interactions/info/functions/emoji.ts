import Bot from "structures/Bot";
import { time } from "@discordjs/builders";
import * as DJS from "discord.js";

export async function emojiInfo(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const emoji = interaction.options.getString("emoji", true);
  const foundEmoji = findEmoji(interaction.guild!, emoji);

  if (!foundEmoji) {
    return interaction.reply({
      content: "Emoji can only be a custom emoji or the emoji was not found",
    });
  }

  let emojiAuthor: string | null = null;

  try {
    emojiAuthor = await foundEmoji.fetchAuthor().then((v) => v.tag);
  } catch {
    emojiAuthor = "Invalid Permissions";
  }

  const accessibleBy = foundEmoji.roles.cache.map((r) => r.name).join(", ") || lang.GLOBAL.EVERYONE;

  const embed = bot.utils
    .baseEmbed(interaction)
    .setTitle(`Emoji info: ${foundEmoji}`)
    .setThumbnail(foundEmoji.url).setDescription(`
**Name:** ${foundEmoji.name}
**ID:** ${foundEmoji.id}
**Created At:** ${time(new Date(foundEmoji.createdAt), "F")}
**Created by:** ${emojiAuthor}
**Accessible By:** ${accessibleBy}`);

  return interaction.reply({ embeds: [embed] });
}

function findEmoji(guild: DJS.Guild, arg: string) {
  const regex = arg.replace(/^<a?:\w+:(\d+)>$/, "$1");
  return (
    guild.emojis.cache.find((emoji) => emoji.name === arg) ||
    guild.emojis.cache.find((emoji) => emoji.id === regex)
  );
}
