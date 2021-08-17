import * as DJS from "discord.js";
import BlacklistedModel from "models/Blacklisted.model";
import { Bot } from "structures/Bot";
import { ValidateReturn } from "structures/Command/BaseCommand";
import { SubCommand } from "structures/Command/SubCommand";

export default class BlacklistAdd extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      groupName: "blacklist",
      commandName: "bot-owner",
      name: "add",
      description: "Blacklist a user from the bot",
      options: [
        {
          name: "user",
          type: "USER",
          description: "The user that needs to be blacklisted",
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

    if (user.id === this.bot.user?.id) {
      return interaction.editReply({
        content: lang.BOT_OWNER.CANNOT_BL_BOT,
      });
    }

    const owners = process.env["OWNERS"];
    if (owners?.includes(user?.id)) {
      return interaction.editReply({
        content: lang.BOT_OWNER.CANNOT_BL_OWNER,
      });
    }

    const existing = await BlacklistedModel.findOne({ user_id: user.id });
    if (existing) {
      return interaction.editReply({
        content: lang.BOT_OWNER.ALREADY_BLD.replace("{member}", user?.tag),
      });
    }

    await BlacklistedModel.create({
      user_id: user.id,
    });

    await interaction.editReply({
      content: lang.BOT_OWNER.BLACKLISTED_SUCCESS.replace("{member}", user?.tag).replace(
        "{type}",
        lang.BOT_OWNER.BLACKLISTED,
      ),
    });
  }
}
