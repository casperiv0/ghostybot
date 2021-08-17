import * as DJS from "discord.js";
import BlacklistedModel from "models/Blacklisted.model";
import { Bot } from "structures/Bot";
import { ValidateReturn } from "structures/Command/BaseCommand";
import { SubCommand } from "structures/Command/SubCommand";

export default class BlacklistRemove extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      groupName: "blacklist",
      commandName: "bot-owner",
      name: "remove",
      description: "Remove a user from the blacklist",
      options: [
        {
          name: "user",
          type: "USER",
          description: "The user that needs to be unblacklisted",
          required: true,
        },
      ],
    });
  }

  async validate(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ): Promise<ValidateReturn> {
    const owners = process.env["OWNERS"];
    const isOwner = owners?.includes(interaction.user.id);

    if (!isOwner) {
      return { ok: false, error: { ephemeral: true, content: lang.MESSAGE.OWNER_ONLY } };
    }

    return { ok: true };
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    await interaction.deferReply({ ephemeral: true });

    const user = interaction.options.getUser("user", true);

    const dbUser = await BlacklistedModel.findOne({ user_id: user.id });
    if (!dbUser) {
      return interaction.editReply({
        content: lang.BOT_OWNER.NOT_BLD,
      });
    }

    await BlacklistedModel.findByIdAndDelete(dbUser._id);

    await interaction.editReply({
      content: lang.BOT_OWNER.BLACKLISTED_SUCCESS.replace("{member}", user?.tag).replace(
        "{type}",
        lang.BOT_OWNER.UNBLACKLISTED,
      ),
    });
  }
}
