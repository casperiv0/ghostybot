import * as DJS from "discord.js";
import Bot from "structures/Bot";
import Event from "structures/Event";

export default class InteractionEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "interactionCreate");
  }

  async execute(bot: Bot, interaction: DJS.Interaction) {
    if (!interaction.isCommand()) return;

    await bot.application?.commands.fetch(interaction.commandId).catch(() => null);

    if (!interaction.guildId) return;

    try {
      const command = bot.interactions.get(interaction.command?.name ?? "");

      if (!command) {
        if (!interaction.commandId) return;

        const guild = await bot.utils.getGuildById(interaction.guildId);

        const command = guild?.slash_commands.find((c) => c.slash_cmd_id === interaction.commandId);

        if (!command) {
          return interaction.reply({ content: "An error has occurred" });
        }

        return interaction.reply({ content: command.response });
      }

      await command?.execute(
        interaction,
        interaction.options.array().map((v) => v.value),
      );
    } catch (e) {
      interaction.reply({ content: "An error has occurred" });
      bot.utils.sendErrorLog(e, "error");
    }
  }
}
