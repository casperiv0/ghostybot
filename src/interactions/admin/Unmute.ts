import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

const permissions = [DJS.Permissions.FLAGS.MODERATE_MEMBERS];

export default class UnmuteCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "admin",
      name: "unmute",
      description: "Remove a timeout from a user",
      botPermissions: permissions,
      memberPermissions: permissions,
      options: [
        {
          name: "user",
          description: "The user to unmute",
          type: "USER",
          required: true,
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const member = interaction.options.getMember("user", true);
    if (!member || !("timeout" in member)) {
      return interaction.reply({
        ephemeral: true,
        content: lang.ADMIN.PROVIDE_VALID_MEMBER,
      });
    }

    if (typeof member.communicationDisabledUntilTimestamp !== "number") {
      return interaction.reply({
        ephemeral: true,
        content: lang.ADMIN.NOT_MUTED,
      });
    }

    await member.timeout(null);

    interaction.reply({
      ephemeral: true,
      content: lang.ADMIN.SUC_UNMUTE.replace("{mutedMemberTag}", member.user.tag),
    });

    this.bot.emit("guildMuteRemove", interaction.guild, {
      member,
      executor: interaction.user,
    });
  }
}
