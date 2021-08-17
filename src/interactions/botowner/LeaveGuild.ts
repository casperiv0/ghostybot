import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { ValidateReturn } from "structures/Command/BaseCommand";
import { SubCommand } from "structures/Command/SubCommand";

export default class LeaveGuildCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      name: "leave-guild",
      description: "Leave a guild by id",
      commandName: "bot-owner",
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

  async validate(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ): Promise<ValidateReturn> {
    const owners = process.env["OWNERS"];
    const isOwner = owners?.includes(interaction.user.id);

    if (!isOwner) {
      return { ok: false, error: { ephemeral: true, content: lang.MESSAGE.OWNER_ONLY } };
    }

    return { ok: true };
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
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

      await interaction.reply({
        content: lang.GUILD.LEFT.replace("{guild_name}", guild.name),
      });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return interaction.reply(lang.GLOBAL.ERROR);
    }
  }
}
