import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class GiveXPCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      name: "give-xp",
      commandName: "levels",
      description: "Give a user xp",
      memberPermissions: [DJS.PermissionFlagsBits.ManageGuild],
      options: [
        {
          name: "user",
          description: "The user you want to give XP",
          type: DJS.ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: "amount",
          description: "The amount you want to give",
          type: DJS.ApplicationCommandOptionType.Number,
          required: true,
        },
      ],
    });
  }

  async execute(
    interaction: DJS.ChatInputCommandInteraction<"cached" | "raw">,
    lang: typeof import("@locales/english").default,
  ) {
    const amount = interaction.options.getNumber("amount", true);
    const user = interaction.options.getUser("user", true);

    if (user.bot) {
      return interaction.reply({ ephemeral: true, content: lang.MEMBER.BOT_DATA });
    }

    if (amount < 1) {
      return interaction.reply({
        ephemeral: true,
        content: lang.ECONOMY.MIN_AMOUNT,
      });
    }

    const dbUser = await this.bot.utils.getUserById(user.id, interaction.guildId!);
    if (!dbUser) {
      return interaction.reply({ ephemeral: true, content: lang.GLOBAL.ERROR });
    }

    await this.bot.utils.updateUserById(user.id, dbUser.guild_id, {
      xp: dbUser.xp + amount,
    });

    await interaction.reply({
      content: this.bot.utils.translate(lang.LEVELS.GIVE_XP_SUCCESS, {
        member: user.tag,
        amount,
      }),
    });
  }
}
