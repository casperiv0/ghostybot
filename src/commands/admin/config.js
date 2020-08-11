const { MessageEmbed } = require("discord.js");
const {
  getServerPrefix,
  getAnnounceChannel,
  getAuditChannel,
  getSuggestChannel,
} = require("../../utils/functions");

module.exports = {
  name: "config",
  description: "Returns the config",
  category: "admin",
  aliases: ["conf", "cfg"],
  async execute(bot, message) {
    const { guild } = message;
    const { name, id: guildId } = guild;
    const prefix = (await getServerPrefix(guildId)) || "!";
    const announceCh = (await getAnnounceChannel(guildId)) || "None";
    const auditCh = (await getAuditChannel(guildId)) || "None";
    const suggestCh = (await getSuggestChannel(guildId)) || "None";

    const embed = new MessageEmbed()
      .setTitle(`${name}'s config`)
      .addField("**Prefix**", prefix, true)
      .addField("**Announce Channel**", announceCh.id ? `<#${announceCh.id}>` : announceCh, true)
      .addField("**Audit Channel**", auditCh.id ? `<#${auditCh.id}>` : auditCh, true)
      .addField("Suggestion Channel", suggestCh ? `<#${suggestCh.id}>` : suggestCh, true)
      .setColor("BLUE")
      .setFooter(message.author.username)
      .setTimestamp();

    message.channel.send({ embed });
  },
};
