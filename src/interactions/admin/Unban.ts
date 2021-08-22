import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class UnbanCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "admin",
      name: "unban",
      description: "Unban a member from the current guild",
      botPermissions: [DJS.Permissions.FLAGS.BAN_MEMBERS],
      memberPermissions: [DJS.Permissions.FLAGS.BAN_MEMBERS],
      options: [
        {
          name: "user-id",
          type: "STRING",
          required: true,
          description: "The user id of the banned member",
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const userId = interaction.options.getString("user-id", true);

    const bannedUser = await interaction.guild?.members.unban(userId as DJS.Snowflake);

    await interaction.reply({
      ephemeral: true,
      content: lang.ADMIN.SUC_UNBAN.replace("{bannedUsername}", `${bannedUser?.username}`),
    });
  }
}
