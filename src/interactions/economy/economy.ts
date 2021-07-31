import { CommandInteraction } from "discord.js";
import Bot from "structures/Bot";
import Interaction from "structures/Interaction";
import { economyOptions } from "./options";

import { balance } from "./functions/balance";
import { buy } from "./functions/buy";
import { deposit } from "./functions/deposit";
import { dice } from "./functions/dice";
import { inventory } from "./functions/inventory";
import { moneyLeaderboard } from "./functions/moneyleaderboard";
import { pay } from "./functions/pay";
import { profile } from "./functions/profile";
import { rob } from "./functions/rob";
import { slots } from "./functions/slots";
import { weekly } from "./functions/weekly";
import { daily } from "./functions/daily";
import { work } from "./functions/work";
import { withdraw } from "./functions/withdraw";

export default class EconomyCommand extends Interaction {
  constructor(bot: Bot) {
    super(bot, {
      name: "economy",
      description: "Economy commands",
      category: "economy",
      options: economyOptions,
    });
  }

  async execute(interaction: CommandInteraction) {
    const lang = await this.bot.utils.getGuildLang(interaction.guild?.id);

    try {
      const command = interaction.options.getSubcommand(true);

      switch (command) {
        case "balance": {
          await balance(this.bot, interaction, lang);
          break;
        }
        case "buy": {
          await buy(this.bot, interaction, lang);
          break;
        }
        case "deposit": {
          await deposit(this.bot, interaction, lang);
          break;
        }
        case "dice": {
          await dice(this.bot, interaction, lang);
          break;
        }
        case "inventory": {
          await inventory(this.bot, interaction, lang);
          break;
        }
        case "money-leaderboard": {
          await moneyLeaderboard(this.bot, interaction, lang);
          break;
        }
        case "pay": {
          await pay(this.bot, interaction, lang);
          break;
        }
        case "profile": {
          await profile(this.bot, interaction, lang);
          break;
        }
        case "rob": {
          await rob(this.bot, interaction, lang);
          break;
        }
        case "slots": {
          await slots(this.bot, interaction, lang);
          break;
        }
        // case "store": {
        //   await store(this.bot, interaction, lang);
        //   break;
        // }
        case "weekly": {
          await weekly(this.bot, interaction, lang);
          break;
        }
        case "daily": {
          await daily(this.bot, interaction, lang);
          break;
        }
        case "work": {
          await work(this.bot, interaction, lang);
          break;
        }
        case "withdraw": {
          await withdraw(this.bot, interaction, lang);
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
