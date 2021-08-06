import { Bot } from "structures/Bot";
import * as DJS from "discord.js";

export async function rockPaperScissors(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const input = interaction.options.getString("item", true).toLowerCase();

  const replies = [lang.GAMES.ROCK, lang.GAMES.PAPER, lang.GAMES.SCISSORS];
  const inp = replies.find((r) => r.toLowerCase() === input);

  const reply = replies[Math.floor(Math.random() * replies.length)];

  const hasWon = checkWon(inp!.toLowerCase(), reply.toLowerCase());
  if (hasWon === true) {
    const user = await bot.utils.getUserById(interaction.user.id, interaction.guildId!);
    if (!user) {
      return interaction.reply({ ephemeral: true, content: lang.GLOBAL.ERROR });
    }

    await bot.utils.updateUserById(interaction.user.id, interaction.guildId!, {
      money: user.money + 50,
    });
  }

  const winner =
    hasWon === true ? lang.GAMES.YOU_WON : hasWon === 0 ? lang.GAMES.BOTH_WON : lang.GAMES.BOT_WON;

  const embed = bot.utils
    .baseEmbed(interaction)
    .setTitle(lang.GAMES.RPS)
    .setDescription(`**${lang.GAMES.WINNER}:** ${winner}`)
    .addField(lang.GAMES.YOUR_CHOICE, input)
    .addField(lang.GAMES.OPPONENTS_CHOICE, reply);

  return interaction.reply({ embeds: [embed] });
}

function checkWon(input: string, reply: string) {
  const isRock = (v: string) => v === "rock";
  const isPaper = (v: string) => v === "paper";
  const isScissors = (v: string) => v === "scissors";

  const IWon =
    (isRock(input) && isScissors(reply)) /* 'Rock' wins over 'Scissors'  */ ||
    (isPaper(input) && isRock(reply)) /* 'Paper' wins over 'Rock' */ ||
    (isScissors(input) && isPaper(reply)); /* 'Scissors' wins over 'Paper' */

  if (IWon) {
    return true;
  } else if (input === reply) {
    return 0;
  }

  return false;
}
