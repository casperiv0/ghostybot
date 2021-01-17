import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class UnDeafenCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "undeafen",
      description: "Undeafen a user from voice channel",
      category: "admin",
      botPermissions: ["DEAFEN_MEMBERS"],
      memberPermissions: ["DEAFEN_MEMBERS"],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const undeafenUser = await bot.utils.findMember(message, args);
  
      if (!undeafenUser) {
        return message.channel.send(lang.ADMIN.PROVIDE_VALID_MEMBER);
      }
  
      if (!undeafenUser?.voice.serverDeaf) {
        return message.channel.send(lang.ADMIN.NOT_IN_VOICE_OR_NOT_DEAF);
      }
  
      undeafenUser.voice.setDeaf(false, "undeafenReason");
  
      undeafenUser.user.send(
        lang.ADMIN.UNDEAFENED_USER.replace("{guildName}", `${message.guild?.name}`)
      );
      message.channel.send(lang.ADMIN.UNDEAFENED.replace("{undeafenUserTag}", undeafenUser.user.tag));
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
