import { Message } from "discord.js";
import { tz } from "moment-timezone";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class WorldClockCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "worldclock",
      description: "Shows the time from other countries",
      category: "util",
      aliases: ["clock", "timezones", "time"],
    });
  }

  async execute(bot: Bot, message: Message) {
    const newYork = tz("America/New_York").format("hh:mm:ss");
    const LosAngeles = tz("America/Los_Angeles").format("hh:mm:ss");
    const Toronto = tz("America/Toronto").format("hh:mm:ss");
    const Chicago = tz("America/Chicago").format("hh:mm:ss");
    const Belgium = tz("Europe/Brussels").format("hh:mm:ss");
    const London = tz("Europe/London").format("hh:mm:ss");
    const Paris = tz("Europe/Paris").format("hh:mm:ss");
    const Berlin = tz("Europe/Berlin").format("hh:mm:ss");
    const Tokyo = tz("Asia/Tokyo").format("hh:mm:ss");
    const Perth = tz("Australia/Perth").format("hh:mm:ss");
    const Sydney = tz("Australia/Sydney").format("hh:mm:ss");
    const Rome = tz("Europe/Rome").format("hh:mm:ss");
    const Singapore = tz("Asia/Singapore").format("hh:mm:ss");

    const embed = bot.utils
      .baseEmbed(message)
      .setTitle("World time zones")
      .addField("Los Angeles, US", LosAngeles, true)
      .addField("New York, US", newYork, true)
      .addField("Chicago, US", Chicago, true)
      .addField("Toronto, Canada", Toronto, true)
      .addField("Brussels, Belgium", Belgium, true)
      .addField("London, UK", London, true)
      .addField("Berlin, Germany", Berlin, true)
      .addField("Paris, France", Paris, true)
      .addField("Rome, Italy", Rome, true)
      .addField("Tokyo, Japan", Tokyo, true)
      .addField("Singapore, Asia", Singapore, true)
      .addField("Perth, Australia", Perth, true)
      .addField("Australia, Sydney", Sydney, true);

    message.channel.send(embed);
  }
}
