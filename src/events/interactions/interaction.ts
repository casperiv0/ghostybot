import { Constants, Interaction } from "discord.js";
import Bot from "structures/Bot";
import Event from "structures/Event";

export default class InteractionEvent extends Event {
  constructor(bot: Bot) {
    super(bot, Constants.Events.INTERACTION_CREATE);
  }

  async execute(bot: Bot, interaction: Interaction) {
    if (!interaction.isCommand()) return;
    if (!interaction.commandID) return;
    if (!interaction.guildID) return;

    const command = bot.interactions.get(interaction.command?.name ?? "");

    if (!command) {
      const guild = await bot.utils.getGuildById(interaction.guildID);

      const command = guild?.slash_commands.find((c) => c.slash_cmd_id === interaction.commandID);

      if (!command) {
        return interaction.reply("An error has occurred");
      }

      return interaction.reply(command.response);
    }

    try {
      await command?.execute(
        interaction,
        interaction.options.map((v) => v.value),
      );
    } catch (e) {
      bot.utils.sendErrorLog(e, "error");
    }
  }
}
