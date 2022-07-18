import process from "node:process";
import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { ValidateReturn } from "structures/Command/BaseCommand";
import { SubCommand } from "structures/Command/SubCommand";
import { prisma } from "utils/prisma";

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
          type: DJS.ApplicationCommandOptionType.User,
          description: "The user that needs to be unblacklisted",
          required: true,
        },
      ],
    });
  }

  async validate(
    interaction: DJS.ChatInputCommandInteraction<"cached" | "raw">,
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
    interaction: DJS.ChatInputCommandInteraction<"cached" | "raw">,
    lang: typeof import("@locales/english").default,
  ) {
    await interaction.deferReply({ ephemeral: true });

    const user = interaction.options.getUser("user", true);

    const existing = await prisma.blacklisteds.findFirst({ where: { user_id: user.id } });
    if (!existing) {
      return interaction.editReply({
        content: lang.BOT_OWNER.NOT_BLD,
      });
    }

    await prisma.blacklisteds.deleteMany({
      where: { user_id: user.id },
    });

    await interaction.editReply({
      content: this.bot.utils.translate(lang.BOT_OWNER.BLACKLISTED_SUCCESS, {
        member: user.tag,
        type: lang.BOT_OWNER.UNBLACKLISTED,
      }),
    });
  }
}
