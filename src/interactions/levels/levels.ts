import { CommandInteraction } from "discord.js";
import { Bot } from "structures/Bot";
import { Interaction } from "structures/Interaction";
import { giveXP } from "./functions/givexp";
import { leaderboard } from "./functions/leaderboard";
import { removeXP } from "./functions/removexp";
import { xp } from "./functions/xp";

import { levelsOptions } from "./options";

export default class LevelsCommand extends Interaction {
  constructor(bot: Bot) {
    super(bot, {
      name: "levels",
      description: "Levels commands",
      category: "levels",
      options: levelsOptions,
    });
  }

  async execute(interaction: CommandInteraction) {
    const lang = await this.bot.utils.getGuildLang(interaction.guild?.id);

    try {
      const command = interaction.options.getSubcommand(true);

      switch (command) {
        case "givexp": {
          await giveXP(this.bot, interaction, lang);
          break;
        }
        case "leaderboard": {
          await leaderboard(this.bot, interaction, lang);
          break;
        }
        case "removexp": {
          await removeXP(this.bot, interaction, lang);
          break;
        }
        case "xp": {
          await xp(this.bot, interaction, lang);
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
