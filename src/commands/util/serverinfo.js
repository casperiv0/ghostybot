const { MessageEmbed } = require("discord.js");
const { formatDate, toCapitalize } = require("../../utils/functions");
const regions = require("../../data/regions.json");

module.exports = {
  name: "serverinfo",
  description: "Get info about the server",
  category: "util",
  aliases: ["guild"],
  execute(bot, message) {
    const { guild } = message;
    const { name } = guild;
    const { owner } = guild;
    const { memberCount } = guild;
    const roles = guild.roles.cache.size;
    const channels = guild.channels.cache.size;
    const emojis = guild.emojis.cache.size;
    const createdAt = formatDate(guild.createdAt);
    const joined = formatDate(message.member.joinedAt);

    const regionKey = guild.region;
    const regionFlag = regions.filter((region) =>
      region.keys.includes(regionKey)
    )[0].flag;
    const region = `${regionFlag} ${toCapitalize(regionKey)}`;

    const verLevel = guild.verificationLevel;
    const mfaLevel = guild.mfaLevel;

    const embed = new MessageEmbed()
      .setTitle(name)
      .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
      .setColor("BLUE")
      .addField("**Server Owner**", owner, true)
      .addField("**Roles Count**", roles, true)
      .addField("**Channel Count**", channels, true)
      .addField("**Emoji Count**", emojis, true)
      .addField("**Member Count**", memberCount, true)
      .addField("**Created At**", createdAt, true)
      .addField("**Joined At**", joined, true)
      .addField("**Region**", region, true)
      .addField("**Verification level**", verLevel, true)
      .addField("**MFA level**", mfaLevel, true);
    message.channel.send(embed);
  },
};
