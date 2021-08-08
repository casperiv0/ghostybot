import { CommandInteraction } from "discord.js";
import { Bot } from "structures/Bot";
import { Interaction } from "structures/Interaction";
import { utilOptions } from "./options";

import { avatar } from "./functions/avatar";
import { bmi } from "./functions/bmi";
import { calc } from "./functions/calc";
import { translate } from "./functions/translate";
import { serverIcon } from "./functions/serverIcon";
import { botInvite } from "./functions/botInvite";
import { poll } from "./functions/poll";
import { pastebin } from "./functions/pastebin";
import { enlarge } from "./functions/enlarge";

export default class UtilCommand extends Interaction {
  constructor(bot: Bot) {
    super(bot, {
      name: "util",
      description: "Util commands",
      category: "util",
      options: utilOptions,
    });
  }

  async execute(interaction: CommandInteraction) {
    const lang = await this.bot.utils.getGuildLang(interaction.guild?.id);

    try {
      const command = interaction.options.getSubcommand(true);

      switch (command) {
        case "avatar": {
          await avatar(this.bot, interaction, lang);
          break;
        }
        case "bmi": {
          await bmi(this.bot, interaction, lang);
          break;
        }
        case "calculate": {
          await calc(this.bot, interaction, lang);
          break;
        }
        case "translate": {
          await translate(this.bot, interaction, lang);
          break;
        }
        case "server-icon": {
          await serverIcon(this.bot, interaction, lang);
          break;
        }
        case "bot-invite": {
          await botInvite(this.bot, interaction, lang);
          break;
        }
        case "poll": {
          await poll(this.bot, interaction, lang);
          break;
        }
        case "pastebin": {
          pastebin(this.bot, interaction, lang);
          break;
        }
        case "enlarge": {
          enlarge(this.bot, interaction, lang);
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
