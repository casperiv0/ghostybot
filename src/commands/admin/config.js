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
        announceCh !== null ? `<#${announceCh}>` : lang.GLOBAL.NONE
      )
      .addField(
        lang.GUILD.SUGGEST_CHANNEL,
        suggestCh !== null ? `<#${suggestCh}>` : lang.GLOBAL.NONE
      )
      .addField(
        lang.GUILD.WELCOME_CHANNEL,
        welcomeCh !== null ? `<#${welcomeCh}>` : lang.GLOBAL.NONE
      )
      .addField(
        lang.GUILD.LEAVE_CHANNEL,
        leaveCh !== null ? `<#${leaveCh}>` : lang.GLOBAL.NONE
      )
      .addField(
        lang.GUILD.LEVEL_UP_MESSAGES,
        levelMsgs !== null ? "true" : "false"
      );

    message.channel.send({ embed });
  },
};
