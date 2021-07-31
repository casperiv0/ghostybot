import { CommandInteraction, Permissions, Snowflake } from "discord.js";
import ms from "ms";
import Bot from "structures/Bot";
import Interaction from "structures/Interaction";

export default class GiveawayCommand extends Interaction {
  constructor(bot: Bot) {
    super(bot, {
      name: "giveaway",
      description: "Manage giveaways",
      category: "giveaway",
      memberPermissions: [Permissions.FLAGS.MANAGE_GUILD],
      options: [
        {
          type: "SUB_COMMAND",
          name: "start",
          description: "Start a new giveaway",
          options: [
            {
              name: "time",
              type: "STRING",
              description: "When the giveaway should end",
              required: true,
            },
            {
              name: "prize",
              type: "STRING",
              description: "The giveaway prize",
              required: true,
            },
            {
              name: "winner-count",
              type: "NUMBER",
              description: "The amount of people that can win (Default: 1)",
            },
          ],
        },
        {
          type: "SUB_COMMAND",
          name: "end",
          description: "End a giveaway",
          options: [
            {
              description: "The messageId of the giveaway",
              name: "message-id",
              required: true,
              type: "STRING",
            },
          ],
        },
        {
          type: "SUB_COMMAND",
          name: "reroll",
          description: "Re-roll a giveaway",
          options: [
            {
              description: "The messageId of the giveaway",
              name: "message-id",
              required: true,
              type: "STRING",
            },
          ],
        },
      ],
    });
  }

  async execute(interaction: CommandInteraction) {
    const lang = await this.bot.utils.getGuildLang(interaction.guild?.id);

    try {
      const command = interaction.options.getSubcommand(true);

      switch (command) {
        case "start": {
          await this.startGiveaway(interaction, lang);
          break;
        }
        case "end": {
          await this.endGiveaway(interaction, lang);
          break;
        }
        case "reroll": {
          await this.reRollGiveaway(interaction, lang);
          break;
        }

        default:
          break;
      }
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return interaction.reply(lang.GLOBAL.ERROR);
    }
  }

  async startGiveaway(
    interaction: CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const time = interaction.options.getString("time", true);
    const prize = interaction.options.getString("prize", true);
    const winnerCount = interaction.options.getNumber("winner-count") ?? 1;

    if (!ms(time)) {
      return interaction.reply({ ephemeral: true, content: lang.MESSAGE.MUST_BE_DATE });
    }

    await this.bot.giveawayManager.start(interaction.channel as any, {
      time: ms(time),
      prize,
      winnerCount: +winnerCount,
      messages: {
        giveaway: "**🎉🎉 New Giveaway 🎉🎉**",
        giveawayEnded: "**GIVEAWAY ENDED**",
      },
    });

    await interaction.reply({ content: "Giveaway has started", ephemeral: true });
  }

  async endGiveaway(
    interaction: CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const messageId = interaction.options.getString("message-id", true);

    const deleted = await this.bot.giveawayManager.delete(messageId as Snowflake).catch(() => null);

    if (deleted === null) {
      return interaction.reply({
        ephemeral: true,
        // @translation
        content: "Giveaway already ended yet or was not found",
      });
    }

    // @translation
    return interaction.reply({ ephemeral: true, content: "Successfully ended giveaway" });
  }

  async reRollGiveaway(
    interaction: CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const messageId = interaction.options.getString("message-id", true);
    const success = await this.bot.giveawayManager.reroll(messageId as Snowflake).catch(() => null);

    if (success === null) {
      return interaction.reply({
        ephemeral: true,
        // @translation
        content: `No giveaway found with id: ${messageId}`,
      });
    }

    // @translation
    await interaction.reply({ ephemeral: true, content: "Successfully re-rolled the giveaway" });
  }
}
