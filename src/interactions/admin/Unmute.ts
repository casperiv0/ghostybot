import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

const permissions = [DJS.PermissionFlagsBits.ModerateMembers];

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
          type: DJS.ApplicationCommandOptionType.User,
          required: true,
        },
      ],
    });
  }

  async execute(
    interaction: DJS.ChatInputCommandInteraction<"cached">,
    lang: typeof import("@locales/english").default,
  ) {
    const member = interaction.options.getMember("user");
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
      content: this.bot.utils.translate(lang.ADMIN.SUC_UNMUTE, {
        mutedMemberTag: member.user.tag,
      }),
    });

    this.bot.emit("guildMuteRemove", interaction.guild, {
      member,
      executor: interaction.user,
    });
  }
}
