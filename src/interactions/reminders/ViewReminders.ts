import { time } from "@discordjs/builders";
import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";
import { interactionPaginate } from "utils/interactionPaginate";

export default class ViewRemindersCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "reminders",
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
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const guildUser = interaction.options.getUser("user") ?? interaction.user;

    const dbUser = await this.bot.utils.getUserById(guildUser.id, interaction.guildId!);
    if (!dbUser) return;

    if (!dbUser.reminder.hasReminder === true || dbUser.reminder.reminders?.length <= 0) {
      return interaction.reply({ content: lang.REMINDER.NO_ACTIVE_REM });
    }

    const embeds: DJS.MessageEmbed[] = [];

    for (let i = 0; i < dbUser.reminder.reminders.length; i++) {
      if (i % 25 === 0) {
        const mappedReminders = dbUser.reminder.reminders.slice(i, i + 25).map((reminder) => {
          return `**${lang.REMINDER.MESSAGE}** ${reminder.msg}
    **${lang.REMINDER.TIME}** ${reminder.time}
    **ID:** ${reminder.id}
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
}
