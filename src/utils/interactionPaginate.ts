import {
  CommandInteraction,
  Message,
  EmbedBuilder,
  MessageReaction,
  User,
  APIEmbed,
} from "discord.js";
import ms from "ms";
import { Bot } from "structures/Bot";

// if a user reacts with this emoji, the pagination will end
const END_EMOJI = "🛑";
const EMOJIS = ["⏪", "◀️", "▶️", "⏩"];
const ALL_EMOJIS = [...EMOJIS.slice(0, 2), END_EMOJI, ...EMOJIS.slice(1, 4)];
const TIMEOUT = 60 * 1000 * 5; // 5minutes

export async function interactionPaginate(
  interaction: CommandInteraction,
  embeds: EmbedBuilder[],
  bot: Bot,
) {
  let page = 0;

  const v = await interaction.reply({
    fetchReply: true,
    embeds: [
      embeds[0].setFooter({
        text: `Page: ${page + 1} / ${embeds.length} (Times out in ${ms(TIMEOUT, { long: true })})`,
      }),
    ],
  });

  let currentPage: Message | null = null;
  if (!(v instanceof Message)) {
    // @ts-expect-error ignore
    currentPage = new Message(bot, v);
  } else {
    currentPage = v;
  }

  // don't show pagination controls if there's only 1 embed.
  if (embeds.length <= 1) return;

  ALL_EMOJIS.forEach((em) => {
    currentPage?.react(em);
  });

  const filter = (reaction: MessageReaction, user: User) => {
    if (!reaction.emoji.name) return false;
    if (user.bot) return false;

    return ALL_EMOJIS.includes(reaction.emoji.name);
  };

  // @ts-expect-error ignore
  const collector = currentPage.createReactionCollector({ filter, time: TIMEOUT });
  if (!collector) return console.error("No collector");

  collector.on("collect", async (reaction) => {
    reaction.users.remove(interaction.user).catch(() => null);

    switch (reaction.emoji.name) {
      case EMOJIS[0]: {
        page = 0;
        break;
      }
      case EMOJIS[1]: {
        page = page > 0 ? (page -= 1) : embeds.length - 1;
        break;
      }
      case EMOJIS[2]: {
        page = page + 1 < embeds.length ? (page += 1) : 0;
        break;
      }
      case EMOJIS[3]: {
        page = embeds.length - 1;
        break;
      }
      case END_EMOJI: {
        page = -1;
        collector.stop();
        break;
      }
      default:
        break;
    }

    if (page !== -1) {
      currentPage?.edit({
        embeds: [
          embeds[page].setFooter({
            text: `Page: ${page + 1} / ${embeds.length} (Times out in ${ms(TIMEOUT, {
              long: true,
            })})`,
          }),
        ],
      });
    }
  });

  collector.on("end", () => {
    currentPage?.reactions.removeAll().catch(() => null);

    if (currentPage?.embeds[0]) {
      currentPage
        .edit({
          embeds: [
            new EmbedBuilder(currentPage.embeds[0] as APIEmbed).setFooter({ text: "Timed out" }),
          ],
        })
        .catch(() => null);
    }
  });

  return currentPage;
}
