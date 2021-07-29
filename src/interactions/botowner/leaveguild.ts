import { CommandInteraction } from "discord.js";
import Bot from "structures/Bot";
import Interaction from "structures/Interaction";

export default class LeaveGuildCommand extends Interaction {
  constructor(bot: Bot) {
    super(bot, {
      name: "leaveguild",
      description: "Leave a guild by id",
      category: "bot-owner",
      ownerOnly: true,
      options: [
        {
          type: "STRING",
          name: "id",
          description: "The id of the guild",
          required: true,
        },
      ],
    });
  }

  async execute(interaction: CommandInteraction) {
    const lang = await this.bot.utils.getGuildLang(interaction.guild?.id);

    try {
      const id = interaction.options.getString("id", true);

      const guild = this.bot.guilds.cache.find((g) => g.id === id);

      if (!guild) {
        return interaction.reply({
          content: lang.GUILD.NOT_FOUND,
          ephemeral: true,
        });
      }

      await guild.leave();

      interaction.reply({
        content: lang.GUILD.LEFT.replace("{guild_name}", guild.name),
      });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return interaction.reply(lang.GLOBAL.ERROR);
    }
  }
}
