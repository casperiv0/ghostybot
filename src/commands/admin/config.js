const { MessageEmbed } = require("discord.js");
const { getGuildById } = require("../../utils/functions");

module.exports = {
  name: "config",
  description: "Returns the config",
  category: "admin",
  aliases: ["conf", "cfg"],
  async execute(bot, message) {
    const { name, id: guildId } = message.guild;
    const guild = await getGuildById(guildId);

    const prefix = guild.prefix;
    const announceCh = guild?.announcement_channel;
    const suggestCh = guild?.suggest_channel;
    const welcomeCh = guild?.welcome_channel;
    const leaveCh = guild?.leave_channel;

    const embed = new MessageEmbed()
      .setTitle(`${name}'s config`)
      .addField("**Prefix**", prefix)
      .addField(
        "**Announce Channel**",
        announceCh !== null ? `<#${announceCh}>` : "None"
      )
      .addField(
        "Suggestion Channel",
        suggestCh !== null ? `<#${suggestCh}>` : "None"
      )
      .addField(
        "Welcome Channel",
        welcomeCh !== null ? `<#${welcomeCh}>` : "None"
      )
      .addField("Leaves Channel", leaveCh !== null ? `<#${leaveCh}>` : "None")
      .setColor("BLUE")
      .setFooter(message.author.username)
      .setTimestamp();

    message.channel.send({ embed });
  },
};
