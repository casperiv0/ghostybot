import { CommandInteraction } from "discord.js";
import Bot from "structures/Bot";
import Interaction from "structures/Interaction";

import { clearQueue } from "./functions/clearQeue";
import { filter } from "./functions/filter";
import { loop } from "./functions/loop";
import { lyrics } from "./functions/lyrics";
import { nowPlaying } from "./functions/nowPlaying";
import { pause } from "./functions/pause";
import { play } from "./functions/play";
import { queue } from "./functions/queue";
import { remove } from "./functions/remove";
import { resume } from "./functions/resume";
import { seek } from "./functions/seek";
import { shuffle } from "./functions/shuffle";
import { skip } from "./functions/skip";
import { stop } from "./functions/stop";
import { volume } from "./functions/volume";

import { musicOptions } from "./options";

export default class MusicCommand extends Interaction {
  constructor(bot: Bot) {
    super(bot, {
      name: "music",
      description: "Music commands",
      category: "music",
      options: musicOptions,
    });
  }

  async execute(interaction: CommandInteraction) {
    const lang = await this.bot.utils.getGuildLang(interaction.guild?.id);

    try {
      const command = interaction.options.getSubcommand(true);

      switch (command) {
        case "clearQueue": {
          await clearQueue(this.bot, interaction, lang);
          break;
        }
        case "filter": {
          await filter(this.bot, interaction, lang);
          break;
        }
        case "loop": {
          await loop(this.bot, interaction, lang);
          break;
        }
        case "lyrics": {
          await lyrics(this.bot, interaction, lang);
          break;
        }
        case "now-playing": {
          await nowPlaying(this.bot, interaction, lang);
          break;
        }
        case "pause": {
          await pause(this.bot, interaction, lang);
          break;
        }
        case "resume": {
          await resume(this.bot, interaction, lang);
          break;
        }
        case "play": {
          await play(this.bot, interaction, lang);
          break;
        }
        case "queue": {
          await queue(this.bot, interaction, lang);
          break;
        }
        case "remove": {
          await remove(this.bot, interaction, lang);
          break;
        }
        case "seek": {
          await seek(this.bot, interaction, lang);
          break;
        }
        case "shuffle": {
          await shuffle(this.bot, interaction, lang);
          break;
        }
        case "skip": {
          await skip(this.bot, interaction, lang);
          break;
        }
        case "stop": {
          await stop(this.bot, interaction, lang);
          break;
        }
        case "volume": {
          await volume(this.bot, interaction, lang);
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
