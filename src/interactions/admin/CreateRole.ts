import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

const colors = {
  WHITE: 0xffffff,
  AQUA: 0x1abc9c,
  BLUE: 0x3498db,
  YELLOW: 0xfee75c,
  PURPLE: 0x9b59b6,
  FUCHSIA: 0xeb459e,
  GOLD: 0xf1c40f,
  ORANGE: 0xe67e22,
  RED: 0xed4245,
  GREY: 0x95a5a6,
  NAVY: 0x34495e,
  DARK_GREEN: 0x1f8b4c,
  DARK_BLUE: 0x206694,
  BLURPLE: 0x5865f2,
  GREYPLE: 0x99aab5,
};

export default class CreateRoleCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "admin",
      name: "create-role",
      description: "Create a new role",
      botPermissions: [DJS.Permissions.FLAGS.MANAGE_ROLES],
      memberPermissions: [DJS.Permissions.FLAGS.MANAGE_ROLES],
      options: [
        {
          name: "name",
          description: "The name for the new role",
          type: "STRING",
          required: true,
        },
        {
          name: "color",
          description: "The color for the new role",
          type: "STRING",
          required: false,
          choices: Object.entries(colors).map(([name, value]) => ({
            name,
            value: value.toString(16),
          })),
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const name = interaction.options.getString("name", true);
    const color = (interaction.options.getString("color") ?? "BLUE") as DJS.ColorResolvable;

    interaction.guild?.roles.create({
      name,
      color,
    });

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(`${lang.ADMIN.CREATED_ROLE_CREATED}: ${name}`)
      .setDescription(lang.ADMIN.CREATED_ROLE_ADDED.replace("{roleName}", name));

    return interaction.reply({ ephemeral: true, embeds: [embed] });
  }
}
