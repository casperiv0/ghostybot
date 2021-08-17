import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class RockPaperScissorsCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "fun",
      name: "rock-paper-scissors",
      description: "Rock Paper Scissors",
      options: [
        {
          required: true,
          type: "STRING",
          name: "item",
          description: "Rock? Paper? Scissors?",
          choices: [
            { name: "Rock", value: "rock" },
            { name: "Paper", value: "paper" },
            { name: "Scissors", value: "scissors" },
          ],
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const input = interaction.options.getString("item", true).toLowerCase();

    const replies = [lang.GAMES.ROCK, lang.GAMES.PAPER, lang.GAMES.SCISSORS];
    const inp = replies.find((r) => r.toLowerCase() === input);

    const reply = replies[Math.floor(Math.random() * replies.length)];

    const hasWon = this.checkWon(inp!.toLowerCase(), reply.toLowerCase());
    if (hasWon === true) {
      const user = await this.bot.utils.getUserById(interaction.user.id, interaction.guildId!);
      if (!user) {
        return interaction.reply({ ephemeral: true, content: lang.GLOBAL.ERROR });
      }

      await this.bot.utils.updateUserById(interaction.user.id, interaction.guildId!, {
        money: user.money + 50,
      });
    }

    const winner =
      hasWon === true
        ? lang.GAMES.YOU_WON
        : hasWon === 0
        ? lang.GAMES.BOTH_WON
        : lang.GAMES.BOT_WON;

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(lang.GAMES.RPS)
      .setDescription(`**${lang.GAMES.WINNER}:** ${winner}`)
      .addField(lang.GAMES.YOUR_CHOICE, input)
      .addField(lang.GAMES.OPPONENTS_CHOICE, reply);

    await interaction.reply({ embeds: [embed] });
  }

  checkWon(input: string, reply: string) {
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
}
