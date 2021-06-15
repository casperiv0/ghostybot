import { Constants, Interaction } from "discord.js";
import Bot from "structures/Bot";
import Event from "structures/Event";

export default class InteractionEvent extends Event {
  constructor(bot: Bot) {
    super(bot, Constants.Events.INTERACTION_CREATE);
  }

  async execute(bot: Bot, interaction: Interaction) {
    if (!interaction.isCommand()) return;

    await bot.application?.commands.fetch(interaction.commandID).catch(() => null);

    if (!interaction.guildID) return;

    try {
      const command = bot.interactions.get(interaction.command?.name ?? "");

      if (!command) {
        if (!interaction.commandID) return;

        const guild = await bot.utils.getGuildById(interaction.guildID);

        const command = guild?.slash_commands.find((c) => c.slash_cmd_id === interaction.commandID);

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
