import { CommandInteraction } from "discord.js";
import { Bot } from "structures/Bot";
import { Interaction } from "structures/Interaction";
import { funOptions } from "./options";

import { ball8 } from "./functions/8ball";
import { advice } from "./functions/advice";
import { ascii } from "./functions/ascii";
import { bet } from "./functions/bet";
import { block } from "./functions/block";
import { compliment } from "./functions/compliment";
import { dadJoke } from "./functions/dadJoke";
import { flipCoin } from "./functions/flipCoin";
import { happiness } from "./functions/happiness";
import { iq } from "./functions/iq";
import { meme } from "./functions/meme";
import { quote } from "./functions/quote";
import { randomJoke } from "./functions/randomJoke";
import { randomNumber } from "./functions/randomNumber";
import { rockPaperScissors } from "./functions/rockPaperScissors";
import { wouldYouRather } from "./functions/wouldYouRather";
import { lmgtfy } from "./functions/lmgtfy";
import { morse } from "./functions/morse";

export default class FunCommand extends Interaction {
  constructor(bot: Bot) {
    super(bot, {
      name: "fun",
      description: "Fun commands",
      category: "fun",
      options: funOptions,
    });
  }

  async execute(interaction: CommandInteraction) {
    const lang = await this.bot.utils.getGuildLang(interaction.guild?.id);

    try {
      const command = interaction.options.getSubcommand(true);

      switch (command) {
        case "8ball": {
          await ball8(this.bot, interaction, lang);
          break;
        }
        case "advice": {
          await advice(interaction);
          break;
        }
        case "ascii": {
          await ascii(this.bot, interaction);
          break;
        }
        case "bet": {
          await bet(this.bot, interaction, lang);
          break;
        }
        case "block": {
          await block(this.bot, interaction);
          break;
        }
        case "compliment": {
          await compliment(this.bot, interaction, lang);
          break;
        }
        case "dad-joke": {
          await dadJoke(interaction);
          break;
        }
        case "flip-coin": {
          await flipCoin(this.bot, interaction, lang);
          break;
        }
        case "happiness": {
          await happiness(this.bot, interaction, lang);
          break;
        }
        case "iq": {
          await iq(this.bot, interaction, lang);
          break;
        }
        case "meme": {
          await meme(this.bot, interaction, lang);
          break;
        }
        case "morse": {
          await morse(this.bot, interaction, lang);
          break;
        }
        case "quote": {
          await quote(this.bot, interaction, lang);
          break;
        }
        case "random-joke": {
          await randomJoke(interaction);
          break;
        }
        case "random-number": {
          await randomNumber(interaction);
          break;
        }
        case "rock-paper-scissors": {
          await rockPaperScissors(this.bot, interaction, lang);
          break;
        }
        case "would-you-rather": {
          await wouldYouRather(this.bot, interaction, lang);
          break;
        }
        case "lmgtfy": {
          await lmgtfy(this.bot, interaction, lang);
          break;
        }

        default:
          break;
      }
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");

      interaction.deferred
        ? interaction.editReply(lang.GLOBAL.ERROR)
        : interaction.reply({ content: lang.GLOBAL.ERROR, ephemeral: true });
    }
  }
}
