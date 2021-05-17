/* thanks to Tovade! https://github.com/tovade/Andoi/blob/HEAD/src/modules/paginate.js#L3 */
import { Message, MessageEmbed, MessageReaction, User } from "discord.js";

// if a user reacts with this emoji, the pagination will end
const END_EMOJI = "🛑";
const EMOJIS = ["⏪", "◀️", "▶️", "⏩"];
const ALL_EMOJIS = [...EMOJIS, END_EMOJI];
const TIMEOUT = 60 * 60 * 1000 * 5; // 5minutes

async function paginate(message: Message, embeds: MessageEmbed[]) {
  let page = 0;

  const currentPage = await message.channel.send(
    embeds[0].setFooter(`Page: ${page + 1} / ${embeds.length} (Times out in 5minutes)`),
  );

  ALL_EMOJIS.forEach((em) => {
    currentPage.react(em);
  });

  const filter = (reaction: MessageReaction, user: User) => {
    if (!reaction.emoji.name) return false;
    if (user.bot) return false;

    return ALL_EMOJIS.includes(reaction.emoji.name);
  };

  const collector = currentPage.createReactionCollector(filter, { time: TIMEOUT });

  collector.on("collect", async (reaction) => {
    reaction.users.remove(message.author).catch(() => null);

    switch (reaction.emoji.name) {
      case EMOJIS[0]: {
        page = 0;
        break;
      }
      case EMOJIS[1]: {
        page = page > 0 ? --page : embeds.length - 1;
        break;
      }
      case EMOJIS[2]: {
        page = page + 1 < embeds.length ? ++page : 0;
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
      currentPage.edit(
        embeds[page].setFooter(`Page: ${page + 1} / ${embeds.length} (Times out in 5 minutes)`),
      );
    }
  });

  collector.on("end", () => {
    currentPage.reactions.removeAll().catch(() => null);

    if (currentPage.embeds[0]) {
      currentPage.edit(currentPage.embeds[0].setFooter("Timed out")).catch(() => null);
    }
  });

  return currentPage;
}

export default paginate;
