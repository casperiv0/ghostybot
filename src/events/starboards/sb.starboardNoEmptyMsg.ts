import { Message, User } from "discord.js";
import Bot from "../../structures/Bot";
import Event from "../../structures/Event";

export default class StarboardNoEmptyMsgEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "starboardNoEmptyMsg");
  }

  async execute(bot: Bot, emoji: string, message: Message, user: User) {
    if (!message.guild?.available) return;
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    return message.channel.send(lang.EVENTS.STARBOARD_NOT_STAR.replace("{userTag}", user.tag));
  }
}
