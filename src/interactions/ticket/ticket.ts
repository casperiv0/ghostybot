import { CommandInteraction } from "discord.js";
import Bot from "structures/Bot";
import Interaction from "structures/Interaction";

export default class TicketsCommand extends Interaction {
  constructor(bot: Bot) {
    super(bot, {
      name: "tickets",
      description: "Create or close a ticket",
      category: "ticket",
      options: [
        {
          type: "SUB_COMMAND",
          name: "create",
          description: "Open a new ticket",
        },
        {
          type: "SUB_COMMAND",
          name: "close",
          description: "Close your ticket",
        },
      ],
    });
  }

  async execute(interaction: CommandInteraction) {
    const lang = await this.bot.utils.getGuildLang(interaction.guild?.id);

    try {
      const command = interaction.options.getSubCommand(true);

      console.log(command);

      if (command === "create") {
        await this.createTicket(interaction);
      } else {
        await this.closeTicket(interaction);
      }

      interaction.reply("Hello world");
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return interaction.reply(lang.GLOBAL.ERROR);
    }
  }

  async createTicket(interaction: CommandInteraction) {}

  async closeTicket(interaction: CommandInteraction) {}
}
