import { CommandInteraction } from "discord.js";
import { Bot } from "structures/Bot";
import { Interaction } from "structures/Interaction";
import { imageOptions } from "./options";

import { changeMyMind } from "./functions/changeMyMind";
import { clyde } from "./functions/clyde";
import { foodPorn } from "./functions/foodPorn";
import { giphy } from "./functions/giphy";
import { imgfy } from "./functions/imgfy";
import { invert } from "./functions/invert";
import { magik } from "./functions/magik";
import { supreme } from "./functions/supreme";
import { threshold } from "./functions/threshold";
import { trash } from "./functions/trash";
import { tweet } from "./functions/tweet";
import { ytComment } from "./functions/ytComment";
import { amazingEarth } from "./functions/amazingEarth";
import { pikachu } from "./functions/pikachu";

export default class ImageCommand extends Interaction {
  constructor(bot: Bot) {
    super(bot, {
      name: "image",
      description: "Image commands",
      category: "image",
      options: imageOptions,
    });
  }

  async execute(interaction: CommandInteraction) {
    const lang = await this.bot.utils.getGuildLang(interaction.guild?.id);

    try {
      const command = interaction.options.getSubcommand(true);

      switch (command) {
        case "amazing-earth": {
          await amazingEarth(this.bot, interaction);
          break;
        }
        case "change-my-mind": {
          await changeMyMind(this.bot, interaction, lang);
          break;
        }
        case "clyde": {
          await clyde(this.bot, interaction, lang);
          break;
        }
        case "foodporn": {
          await foodPorn(this.bot, interaction);
          break;
        }
        case "giphy": {
          await giphy(this.bot, interaction, lang);
          break;
        }
        case "imgfy": {
          await imgfy(this.bot, interaction, lang);
          break;
        }
        case "invert": {
          await invert(this.bot, interaction, lang);
          break;
        }
        case "magik": {
          await magik(this.bot, interaction, lang);
          break;
        }
        case "pikachu": {
          await pikachu(this.bot, interaction, lang);
          break;
        }
        case "supreme": {
          await supreme(this.bot, interaction);
          break;
        }
        case "threshold": {
          await threshold(this.bot, interaction, lang);
          break;
        }
        case "trash": {
          await trash(this.bot, interaction, lang);
          break;
        }
        case "tweet": {
          await tweet(this.bot, interaction, lang);
          break;
        }
        case "yt-comment": {
          await ytComment(this.bot, interaction, lang);
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
