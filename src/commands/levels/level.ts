import { Message, MessageAttachment, Permissions } from "discord.js";
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
        return message.channel.send({
          content: lang.ADMIN.PROVIDE_VALID_MEMBER,
        });
      }

      if (member.user?.bot) {
        return message.channel.send({ content: lang.MEMBER.BOT_DATA });
      }

      const user = await this.bot.utils.getUserById(member.user.id, message.guild?.id);
      if (!user) return;

      const level = this.bot.utils.calculateXp(user.xp);
      const avatar = encodeURIComponent(member.user.displayAvatarURL());

      const url = `https://vacefron.nl/api/rankcard?username=${encodeURIComponent(
        member.user.username,
      )}&avatar=${avatar}&level=${level}&rank=${level}&currentxp=${user.xp}&nextlevelxp=${
        user.xp + 1200
      }&previouslevelxp=${user.xp}&custombg=2F3136&xpcolor=fff`;

      const attach = new MessageAttachment(url, "rank.png");

      message.channel.send({ files: [attach] });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
