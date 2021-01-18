import { Message, TextChannel, User } from "discord.js";
import Bot from "../../structures/Bot";
import Event from "../../structures/Event";

export default class StarboardAlreadyStarredEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "starboardAlreadyStarred");
  }

  async execute(bot: Bot, emoji: string, message: Message, user: User) {
    if (!message.guild?.available) return;
    if (!(message.channel as TextChannel).permissionsFor(message.guild.me!)?.has("SEND_MESSAGES"))
      return;

    const lang = await bot.utils.getGuildLang(message.guild?.id);
    return message.channel.send(lang.EVENTS.STARBOARD_MESSAGE.replace("{userTag}", user.tag));
  }
}
