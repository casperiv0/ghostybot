import fetch from "node-fetch";
import { Message, Permissions } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class XpCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "level",
      description: "Get your current level",
      category: "levels",
      aliases: ["lvl", "rank"],
      botPermissions: [Permissions.FLAGS.ATTACH_FILES],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const member = await this.bot.utils.findMember(message, args, { allowAuthor: true });

      if (!member) {
        return message.channel.send(lang.ADMIN.PROVIDE_VALID_MEMBER);
      }

      if (member.user.bot) {
        return message.channel.send(lang.MEMBER.BOT_DATA);
      }

      const user = await this.bot.utils.getUserById(member.user.id, message.guild?.id);
      if (!user) return;

      const level = this.bot.utils.calculateXp(user.xp);

      const url = `https://rank-card.sujalgoel.repl.co/?rank=${encodeURIComponent(
        level,
      )}&level=${encodeURIComponent(level)}&username=${encodeURIComponent(
        member.user.username,
      )}&avatar=${encodeURIComponent(
        member.user.displayAvatarURL({ format: "png" }),
      )}&tag=${encodeURIComponent(member.user.tag)}&status=${encodeURIComponent(
        "online",
      )}&color=${encodeURIComponent("5865f2")}&currentxp=${encodeURIComponent(
        user.xp,
      )}&neededxp=${encodeURIComponent(user.xp + 1200)}`;

      const data = await fetch(`${url}`)
        .then((res) => res.json())
        .catch(console.error);

      message.channel.send(data.data.image);
    } catch (err) {
      console.log(err);

      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
