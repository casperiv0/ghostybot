import { Reminder } from "@/src/models/User.model";
import { interactionPaginate } from "@/src/utils/interactionPaginate";
import { time } from "@discordjs/builders";
import { ApplicationCommandOptionData, CommandInteraction, MessageEmbed } from "discord.js";
import ms from "ms";
import Bot from "structures/Bot";
import Interaction from "structures/Interaction";
import { v4 } from "uuid";

const BASE_OPTIONS: ApplicationCommandOptionData[] = [
  {
    name: "time",
    description: "When the reminder should expire (eg: 1d, 10h, 20min, ..)",
    type: "STRING",
    required: true,
  },
  {
    name: "message",
    description: "The message you want the bot to remind you of",
    type: "STRING",
    required: true,
  },
];

export default class RemindersCommand extends Interaction {
  constructor(bot: Bot) {
    super(bot, {
      name: "reminders",
      description: "Manage your reminders",
      category: "reminder",

      options: [
        {
          type: "SUB_COMMAND",
          name: "view",
          description: "View all your reminders",
          options: [
            {
              name: "user",
              type: "USER",
              description: "The user you want to see their reminders of",
              required: false,
            },
          ],
        },
        {
          type: "SUB_COMMAND",
          name: "create",
          description: "Create a new reminder",
          options: BASE_OPTIONS,
        },
        {
          type: "SUB_COMMAND",
          name: "delete",
          description: "Delete one of your reminders",
          options: [
            {
              description: "The id of the reminder you want to edit",
              name: "id",
              required: true,
              type: "STRING",
            },
          ],
        },
        {
          type: "SUB_COMMAND",
          name: "edit",
          description: "Edit one of your reminders",
          options: [
            {
              description: "The id of the reminder you want to edit",
              name: "id",
              required: true,
              type: "STRING",
            },
            ...BASE_OPTIONS,
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
        case "view": {
          await this.viewReminders(interaction, lang);
          break;
        }
        case "create": {
          await this.createReminder(interaction, lang);
          break;
        }
        case "edit": {
          await this.editReminder(interaction, lang);
          break;
        }
        case "delete": {
          await this.deleteReminder(interaction, lang);
          break;
        }
        default:
          break;
      }
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");

      interaction.deferred
        ? interaction.editReply(lang.GLOBAL.ERROR)
        : interaction.reply({ content: lang.GLOBAL.ERROR, ephemeral: true });
    }
  }

  async viewReminders(
    interaction: CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    let guildUser = interaction.options.getUser("user");
    if (!guildUser) {
      guildUser = interaction.user;
    }

    const dbUser = await this.bot.utils.getUserById(guildUser.id, interaction.guildId!);
    if (!dbUser) return;

    if (!dbUser.reminder.hasReminder === true || dbUser.reminder.reminders?.length <= 0) {
      return interaction.reply({ content: lang.REMINDER.NO_ACTIVE_REM });
    }

    const embeds: MessageEmbed[] = [];

    for (let i = 0; i < dbUser.reminder.reminders.length; i++) {
      if (i % 25 === 0) {
        const mappedReminders = dbUser.reminder.reminders.slice(i, i + 25).map((reminder) => {
          return `**${lang.REMINDER.MESSAGE}** ${reminder.msg}
**${lang.REMINDER.TIME}** ${reminder.time}
**${lang.MEMBER.ID}:** ${reminder.id}
**${lang.REMINDER.ENDS_IN}** ${time(new Date(reminder.ends_at), "R")}`;
        });

        const embed = this.bot.utils
          .baseEmbed(interaction)
          .setTitle(lang.REMINDER.USER_REMINDERS.replace("{memberUsername}", guildUser.username))
          .setDescription(mappedReminders.join("\n\n"));

        embeds.push(embed);
      }
    }

    await interactionPaginate(interaction, embeds, this.bot);
  }

  async createReminder(
    interaction: CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const time = interaction.options.getString("time", true);
    const msg = interaction.options.getString("message", true);

    const isValid = ms(time);
    if (!isValid) {
      return interaction.reply({ ephemeral: true, content: lang.REMINDER.INVALID_DATE });
    }

    const user = await this.bot.utils.getUserById(interaction.user.id, interaction.guildId!);
    if (!user) return;
    const reminders = typeof user.reminder.reminders === "object" ? user.reminder.reminders : [];

    await this.bot.utils.updateUserById(interaction.user.id, interaction.guildId!, {
      reminder: {
        hasReminder: true,
        reminders: [
          ...reminders,
          {
            ends_at: Date.now() + ms(time),
            msg,
            channel_id: interaction.channelId!,
            time,
            id: v4().slice(0, 8),
            _id: v4(),
          },
        ],
      },
    });

    return interaction.reply({
      ephemeral: true,
      content: lang.REMINDER.SUCCESS.replace("{time}", time),
    });
  }

  async editReminder(
    interaction: CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const id = interaction.options.getString("id", true);
    const time = interaction.options.getString("time", true);
    const msg = interaction.options.getString("message", true);

    const user = await this.bot.utils.getUserById(interaction.user.id, interaction.guildId!);
    if (!user) {
      return interaction.reply({ ephemeral: true, content: lang.GLOBAL.ERROR });
    }

    if (!user.reminder.hasReminder) {
      return interaction.reply({ ephemeral: true, content: lang.REMINDER.NO_REMINDER_SET });
    }

    const reminder = user.reminder.reminders.find((r) => r.id === id);
    const updated = user.reminder.reminders.filter((r) => r.id !== id);

    if (!reminder) {
      return interaction.reply({ ephemeral: true, content: "That reminder was not found" });
    }

    const newReminder: Reminder = {
      time,
      ends_at: Date.now() + ms(time),
      msg,
      channel_id: reminder.channel_id,
      id: reminder.id,
      _id: reminder._id,
    };

    this.bot.utils.updateUserById(interaction.user.id, interaction.guildId!, {
      reminder: {
        hasReminder: true,
        reminders: [...updated, newReminder],
      },
    });

    // @translation
    return interaction.reply({ ephemeral: true, content: "Updated reminder" });
  }

  async deleteReminder(
    interaction: CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    let id = interaction.options.getString("id", true);
    const user = await this.bot.utils.getUserById(interaction.user.id, interaction.guildId!);
    if (!user) return;

    if (user?.reminder.hasReminder === false) {
      return interaction.reply({ ephemeral: true, content: lang.REMINDER.NO_REMINDER_SET });
    }

    if (id === "all") {
      await this.bot.utils.updateUserById(interaction.user.id, interaction.guildId!, {
        reminder: {
          hasReminder: false,
          reminders: [],
        },
      });

      return interaction.reply({ ephemeral: true, content: lang.REMINDER.ALL_DELETED });
    }

    switch (id) {
      case "first": {
        id = user.reminder.reminders[0].id;
        break;
      }
      case "last": {
        id = user.reminder.reminders[user.reminder.reminders.length - 1].id;
        break;
      }
      default: {
        break;
      }
    }

    await this.bot.utils.updateUserById(interaction.user.id, interaction.guildId!, {
      reminder: {
        hasReminder: user.reminder.reminders?.length - 1 > 0,
        reminders: user.reminder.reminders.filter((reminder) => reminder.id !== id),
      },
    });

    return interaction.reply({ ephemeral: true, content: lang.REMINDER.REMOVE_SUCCESS });
  }
}
