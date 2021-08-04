import { CommandInteraction } from "discord.js";
import Bot from "structures/Bot";
import Interaction from "structures/Interaction";
import { adminOptions } from "./options";

import { kick } from "./functions/kick";
import { ban } from "./functions/ban";
import { mute } from "./functions/mute";
import { deleteMessages } from "./functions/delete";
import { unMute } from "./functions/unMute";

export default class AdminCommand extends Interaction {
  constructor(bot: Bot) {
    super(bot, {
      name: "admin",
      description: "Admin commands",
      category: "admin",
      options: adminOptions,
    });
  }

  async execute(interaction: CommandInteraction) {
    const lang = await this.bot.utils.getGuildLang(interaction.guild?.id);

    try {
      const command = interaction.options.getSubcommand(true);

      switch (command) {
        case "ban": {
          await ban(this.bot, interaction, lang);
          break;
        }
        case "kick": {
          await kick(this.bot, interaction, lang);
          break;
        }
        case "mute": {
          await mute(this.bot, interaction, lang);
          break;
        }
        case "delete": {
          await deleteMessages(this.bot, interaction, lang);
          break;
        }
        case "unmute": {
          await unMute(this.bot, interaction, lang);
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
