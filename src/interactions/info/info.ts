import { CommandInteraction } from "discord.js";
import { Bot } from "structures/Bot";
import { Interaction } from "structures/Interaction";

import { botInfo } from "./functions/bot";
import { channelInfo } from "./functions/channel";
import { country } from "./functions/country";
import { covid } from "./functions/covid";
import { emojiInfo } from "./functions/emoji";
import { github } from "./functions/github";
import { guildInfo } from "./functions/guild";
import { inviteInfo } from "./functions/invite";
import { ip } from "./functions/ip";
import { minecraft } from "./functions/minecraft";
import { npm } from "./functions/npm";
import { playStore } from "./functions/playStore";
import { pokemon } from "./functions/pokemon";
import { roleInfo } from "./functions/role";
import { spotify } from "./functions/spotify";
import { userInfo } from "./functions/user";
import { weather } from "./functions/weather";
import { infoOptions } from "./options";

export default class InfoCommand extends Interaction {
  constructor(bot: Bot) {
    super(bot, {
      name: "info",
      description: "Information commands",
      category: "information",
      options: infoOptions,
    });
  }

  async execute(interaction: CommandInteraction) {
    const lang = await this.bot.utils.getGuildLang(interaction.guild?.id);

    try {
      const command = interaction.options.getSubcommand(true);

      switch (command) {
        case "bot": {
          await botInfo(this.bot, interaction, lang);
          break;
        }
        case "guild": {
          await guildInfo(this.bot, interaction, lang);
          break;
        }
        case "user": {
          await userInfo(this.bot, interaction, lang);
          break;
        }
        case "channel": {
          await channelInfo(this.bot, interaction, lang);
          break;
        }
        case "github": {
          await github(this.bot, interaction, lang);
          break;
        }
        case "emoji": {
          await emojiInfo(this.bot, interaction, lang);
          break;
        }
        case "invite": {
          await inviteInfo(this.bot, interaction, lang);
          break;
        }
        case "role": {
          await roleInfo(this.bot, interaction, lang);
          break;
        }
        case "pokemon": {
          await pokemon(this.bot, interaction, lang);
          break;
        }
        case "playstore": {
          await playStore(this.bot, interaction, lang);
          break;
        }
        case "spotify": {
          await spotify(this.bot, interaction, lang);
          break;
        }
        case "ip": {
          await ip(this.bot, interaction, lang);
          break;
        }
        case "covid": {
          await covid(this.bot, interaction, lang);
          break;
        }
        case "npm": {
          await npm(this.bot, interaction, lang);
          break;
        }
        case "country": {
          await country(this.bot, interaction, lang);
          break;
        }
        case "weather": {
          await weather(this.bot, interaction, lang);
          break;
        }
        case "minecraft": {
          await minecraft(this.bot, interaction, lang);
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
