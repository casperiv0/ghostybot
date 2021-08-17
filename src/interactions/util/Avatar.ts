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
          type: "USER",
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const user = interaction.options.getUser("user") ?? interaction.user;

    const png = this.getAvatar(user, "png");
    const webp = this.getAvatar(user, "webp");
    const jpg = this.getAvatar(user, "jpg");
    const gif = this.getAvatar(user, "gif");

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(`${user.username} ${lang.UTIL.AVATAR}`)
      .setDescription(`[png](${png}) | [webp](${webp}) | [jpg](${jpg}) | [gif](${gif})`)
      .setImage(`${webp}`);

    await interaction.reply({ embeds: [embed] });
  }

  getAvatar(user: DJS.User, format: DJS.AllowedImageFormat | "gif") {
    return user.displayAvatarURL({
      dynamic: true,
      size: 4096,
      format: format as DJS.AllowedImageFormat,
    });
  }
}
