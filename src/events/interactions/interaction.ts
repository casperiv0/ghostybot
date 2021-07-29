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

    const lang = await this.bot.utils.getGuildLang(interaction.guild?.id);

    try {
      const command = bot.interactions.get(interaction.command?.name ?? "");

      if (!command) {
        if (!interaction.commandId) return;

        const guild = await bot.utils.getGuildById(interaction.guildId);
        const command = guild?.slash_commands.find((c) => c.slash_cmd_id === interaction.commandId);
        if (!command) return;

        return interaction.reply({ content: command.response });
      }

      if (!this.isOwner(interaction)) {
        return interaction.reply({
          content: lang.MESSAGE.OWNER_ONLY,
          ephemeral: true,
        });
      }

      await command?.execute(interaction);
    } catch (e) {
      interaction.reply({ ephemeral: true, content: lang.GLOBAL.ERROR });
      bot.utils.sendErrorLog(e, "error");
    }
  }

  isOwner(interaction: DJS.CommandInteraction) {
    const owners = process.env["OWNERS"];
    return owners?.includes(interaction.user.id);
  }
}
