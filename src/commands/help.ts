import { Message } from "discord.js";
import { hyperlink } from "@discordjs/builders";
import { Command } from "structures/Command";
import { Bot } from "structures/Bot";

/**
 * @deprecated will be removed when message intents arrive
 */
export default class HelpCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "help",
      description: "Shows all commands Or shows more info about a command",
      category: "util",
    });
  }

  async execute(message: Message) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const LINK = hyperlink(
        "Click here for a full command list",
        "https://github.com/Dev-CasperTheGhost/ghostybot/blob/main/docs/COMMANDS.md",
      );

      const embed = this.bot.utils
        .baseEmbed(message)
        .setTitle(lang.HELP.HELP)
        .setDescription(
          "Regular commands are now fully removed from GhostyBot. Please use slash commands instead.",
        )
        .addField(
          "Why slash commands",
          "Discord has announced a new [Intent](https://support-dev.discord.com/hc/en-us/articles/4404772028055) which will require all/most verified bots to transition over to slash commands. I think this is a good privacy change.",
        )
        .addField(lang.HELP.FULL_CMD_LIST, LINK);

      await message.channel.send({ embeds: [embed] });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
