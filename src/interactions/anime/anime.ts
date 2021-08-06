import { CommandInteraction } from "discord.js";
import { Bot } from "structures/Bot";
import { Interaction } from "structures/Interaction";
import { animeOptions } from "./options";

import { baka } from "./functions/baka";
import { cuddle } from "./functions/cuddle";
import { feed } from "./functions/feed";
import { hug } from "./functions/hug";
import { kiss } from "./functions/kiss";
import { owo } from "./functions/owo";
import { pat } from "./functions/pat";
import { poke } from "./functions/poke";
import { slap } from "./functions/slap";
import { smug } from "./functions/smug";

export default class AnimeCommand extends Interaction {
  constructor(bot: Bot) {
    super(bot, {
      name: "anime",
      description: "Anime commands",
      category: "anime",
      options: animeOptions,
    });
  }

  async execute(interaction: CommandInteraction) {
    const lang = await this.bot.utils.getGuildLang(interaction.guild?.id);

    try {
      const command = interaction.options.getSubcommand(true);

      switch (command) {
        case "baka": {
          await baka(this.bot, interaction, lang);
          break;
        }
        case "cuddle": {
          await cuddle(this.bot, interaction, lang);
          break;
        }
        case "feed": {
          await feed(this.bot, interaction, lang);
          break;
        }
        case "hug": {
          await hug(this.bot, interaction, lang);
          break;
        }
        case "kiss": {
          await kiss(this.bot, interaction, lang);
          break;
        }
        case "owo": {
          await owo(this.bot, interaction, lang);
          break;
        }
        case "pat": {
          await pat(this.bot, interaction, lang);
          break;
        }
        case "poke": {
          await poke(this.bot, interaction, lang);
          break;
        }
        case "slap": {
          await slap(this.bot, interaction, lang);
          break;
        }
        case "smug": {
          await smug(this.bot, interaction, lang);
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
