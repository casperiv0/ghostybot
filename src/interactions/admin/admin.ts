import { CommandInteraction } from "discord.js";
import Bot from "structures/Bot";
import Interaction from "structures/Interaction";
import { adminOptions } from "./options";

import { kick } from "./functions/kick";
import { ban } from "./functions/ban";
import { mute } from "./functions/mute";
import { deleteMessages } from "./functions/delete";
import { unMute } from "./functions/unMute";
import { warn } from "./functions/warn";
import { lockChannel } from "./functions/lockChannel";
import { unlockChannel } from "./functions/unlockChannel";
import { say } from "./functions/say";
import { setSticky } from "./functions/setSticky";
import { removeSticky } from "./functions/removeSticky";

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
      const group = interaction.options.getSubcommandGroup(false);

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
        case "warn": {
          await warn(this.bot, interaction, lang);
          break;
        }
        case "lock-channel": {
          await lockChannel(this.bot, interaction, lang);
          break;
        }
        case "unlock-channel": {
          await unlockChannel(this.bot, interaction, lang);
          break;
        }
        case "say": {
          await say(this.bot, interaction, lang);
          break;
        }

        default: {
          if (group === "sticky") {
            if (command === "set") {
              setSticky(this.bot, interaction, lang);
            }

            if (command === "remove") {
              removeSticky(this.bot, interaction, lang);
            }
          }
        }
      }
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");

      interaction.deferred
        ? interaction.editReply(lang.GLOBAL.ERROR)
        : interaction.reply({ content: lang.GLOBAL.ERROR, ephemeral: true });
    }
  }
}
