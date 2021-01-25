import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class DeafenCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "deafen",
      description: "Deafen a user",
      category: "admin",
      botPermissions: ["DEAFEN_MEMBERS"],
      memberPermissions: ["DEAFEN_MEMBERS"],
      requiredArgs: [{ name: "member" }, { name: "reason" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    try {
      const deafenMember = await bot.utils.findMember(message, args);
      const deafenReason = args.slice(1).join(" ");

      if (!deafenMember) {
        return message.channel.send(lang.MEMBER.NOT_FOUND);
      }

      if (deafenMember?.voice?.serverDeaf) {
        return message.channel.send(lang.ADMIN.DEAFEN_ALREADY_DEAFENED);
      }

      deafenMember.voice.setDeaf(true, "deafenReason");

      deafenMember.user.send(
        lang.ADMIN.DEAFEN_SUCCESS_DM.replace("{guild}", `${message.guild?.name}`).replace(
          "{reason}",
          deafenReason
        )
      );
      message.channel.send(
        lang.ADMIN.DEAFEN_SUCCESS.replace("{member}", `${deafenMember.user.tag}`).replace(
          "{reason}",
          deafenReason
        )
      );
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
