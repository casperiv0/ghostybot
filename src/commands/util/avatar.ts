import { AllowedImageFormat, GuildMember, Message } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class AvatarCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "avatar",
      description: "Get user avatar",
      category: "util",
      aliases: ["av"],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const member = await this.bot.utils.findMember(message, args, { allowAuthor: true });

      const png = this.avatar(member, "png");
      const webp = this.avatar(member, "webp");
      const jpg = this.avatar(member, "jpg");
      const gif = this.avatar(member, "gif");

      const embed = this.bot.utils
        .baseEmbed(message)
        .setTitle(`${member?.user.username} ${lang.UTIL.AVATAR}`)
        .setDescription(`[png](${png}) | [webp](${webp}) | [jpg](${jpg}) | [gif](${gif})`)
        .setImage(`${webp}`);

      message.channel.send({ embed });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }

  avatar(member: GuildMember | null | undefined, format: AllowedImageFormat) {
    return member?.user.displayAvatarURL({
      dynamic: true,
      size: 1024,
      format,
    });
  }
}
