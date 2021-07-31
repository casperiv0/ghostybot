import { CommandInteraction } from "discord.js";
import Bot from "structures/Bot";
import Interaction from "structures/Interaction";
import { botInfo } from "./functions/bot";

import { channelInfo } from "./functions/channel";
import { emojiInfo } from "./functions/emoji";
import { guildInfo } from "./functions/guild";
import { inviteInfo } from "./functions/invite";
import { roleInfo } from "./functions/role";
import { userInfo } from "./functions/user";
import { infoOptions } from "./options";

export default class GiveawayCommand extends Interaction {
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
        case "bot": {
          await botInfo(this.bot, interaction, lang);
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
