import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { Event } from "structures/Event";

/**
 * @deprecated will be removed when message intents arrive
 */
export default class StarboardAlreadyStarredEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "starboardAlreadyStarred");
  }

  async execute(bot: Bot, _: string, message: DJS.Message, user: DJS.User) {
    if (!message.guild?.available) return;
    if (
      !(message.channel as DJS.TextChannel)
        .permissionsFor(message.guild.me!)
        ?.has(DJS.Permissions.FLAGS.SEND_MESSAGES)
    ) {
      return;
    }

    const lang = await bot.utils.getGuildLang(message.guild?.id);
    return message.channel.send({
      content: lang.EVENTS.STARBOARD_MESSAGE.replace("{userTag}", user.tag),
    });
  }
}
