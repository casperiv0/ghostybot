/* Thanks to Tovade! https://github.com/tovade/Andoi/blob/HEAD/src/modules/paginate.js#L3 */
import { Message, MessageEmbed, MessageReaction, User } from "discord.js";

// if a user reacts with this emoji, the pagination will end
const END_EMOJI = "🛑";
const EMOJIS = ["⏪", "◀️", "▶️", "⏩"];

async function paginate(message: Message, embeds: MessageEmbed[]) {
  let page = 0;

  const currentPage = await message.channel.send(
    embeds[0].setFooter(`Page: ${page + 1} / ${embeds.length} (Times out in 5minutes)`),
  );

  await currentPage.react(EMOJIS[0]);
  await currentPage.react(EMOJIS[1]);
  await currentPage.react(END_EMOJI);
  await currentPage.react(EMOJIS[2]);
  await currentPage.react(EMOJIS[3]);

  const filter = (reaction: MessageReaction, user: User) => {
    console.log(reaction.emoji);

    return (
      (EMOJIS.includes(reaction.emoji.name!) || reaction.emoji.name === END_EMOJI) && !user.bot
    );
  };

  // Time out after 5minutes
  const collector = currentPage.createReactionCollector(filter, { time: 120000 });

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
        embeds[page].setFooter(`Page: ${page + 1} / ${embeds.length} (Times out in 5minutes)`),
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
