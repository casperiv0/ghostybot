import { CommandInteraction } from "discord.js";
import Bot from "structures/Bot";
import Interaction from "structures/Interaction";

export default class ShutdownCommand extends Interaction {
  constructor(bot: Bot) {
    super(bot, {
      name: "shutdown",
      description: "Shutdown the bot",
      category: "bot-owner",
      ownerOnly: true,
    });
  }

  async execute(interaction: CommandInteraction) {
    const lang = await this.bot.utils.getGuildLang(interaction.guild?.id);

    try {
      await interaction.reply({ content: lang.BOT_OWNER.SHUTDOWN, ephemeral: true });

      process.exit(1);
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return interaction.reply(lang.GLOBAL.ERROR);
    }
  }
}
