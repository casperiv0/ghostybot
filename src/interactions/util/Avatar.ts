import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class AvatarCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "util",
      name: "avatar",
      description: "View the avatar of a user",
      options: [
        {
          name: "user",
          required: false,
          description: "The user you want to see the avatar of",
          type: DJS.ApplicationCommandOptionType.User,
        },
      ],
    });
  }

  async execute(
    interaction: DJS.ChatInputCommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const user = interaction.options.getUser("user") ?? interaction.user;

    const url = user.displayAvatarURL({ size: 4096 });
    const png = this.getAvatar(url, "png");
    const webp = this.getAvatar(url, "webp");
    const jpg = this.getAvatar(url, "jpg");
    const gif = this.getAvatar(url, "gif");

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(`${user.username} ${lang.UTIL.AVATAR}`)
      .setDescription(`[png](${png}) | [webp](${webp}) | [jpg](${jpg}) | [gif](${gif})`)
      .setImage(`${webp}`);

    await interaction.reply({ embeds: [embed] });
  }

  getAvatar(url: string, format: "png" | "webp" | "jpg" | "gif") {
    return url.replace(".webp", `.${format}`);
  }
}
