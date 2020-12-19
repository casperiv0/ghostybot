const BaseEmbed = require("../../modules/BaseEmbed");
const { getGuildById } = require("../../utils/functions");

module.exports = {
  name: "config",
  description: "Returns the config",
  category: "exempt",
  aliases: ["conf", "cfg"],
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const { name, id: guildId } = message.guild;
    const guild = await getGuildById(guildId);

    const prefix = guild.prefix;
    const announceCh = guild?.announcement_channel;
    const suggestCh = guild?.suggest_channel;
    const welcomeCh = guild?.welcome_channel;
    const leaveCh = guild?.leave_channel;
    const levelMsgs = guild?.level_up_messages;

    const embed = BaseEmbed(message)
      .setTitle(`${name}'s config`)
      .addField(lang.GUILD.PREFIX, prefix)
      .addField(
        lang.GUILD.ANNOUNCE_CHANNEL,
        !announceCh ? lang.GLOBAL.NONE : `<#${announceCh}>`
      )
      .addField(
        lang.GUILD.SUGGEST_CHANNEL,
        !suggestCh ? lang.GLOBAL.NONE : `<#${suggestCh}>`
      )
      .addField(
        lang.GUILD.WELCOME_CHANNEL,
        !welcomeCh ? lang.GLOBAL.NONE : `<#${welcomeCh}>`
      )
      .addField(
        lang.GUILD.LEAVE_CHANNEL,
        !leaveCh ? lang.GLOBAL.NONE : `<#${leaveCh}>`
      )
      .addField(lang.GUILD.LEVEL_UP_MESSAGES, !levelMsgs ? "true" : "false");

    message.channel.send({ embed });
  },
};
