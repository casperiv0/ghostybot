const translate = require("@k3rn31p4nic/google-translate-api");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "translate",
  description: "Translate a sentence",
  usage: "!translate <language> <sentence>",
  category: "util",
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    try {
      const result = await translate(args.slice(1).join(" "), { to: args[0] });

      const embed = BaseEmbed(message)
        .setDescription(result.text)
        .setTitle(lang.UTIL.G_TRANSLATE);

      message.channel.send(embed);
    } catch {
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  },
};
