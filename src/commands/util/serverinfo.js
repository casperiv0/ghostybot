const { formatDate, toCapitalize } = require("../../utils/functions");
const regions = require("../../data/regions.json");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "serverinfo",
  description: "Get info about the server",
  category: "util",
  aliases: ["guild", "server"],
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const { guild } = message;
    const { name, memberCount, premiumSubscriptionCount, premiumTier, verified, partnered } = guild;
    const roles = bot.formatNumber(guild.roles.cache.size);
    const channels = bot.formatNumber(guild.channels.cache.size);
    const emojis = bot.formatNumber(guild.emojis.cache.size);
    const { date: createdAt } = await formatDate(guild.createdAt, message.guild.id);
    const { date: joined, tz } = await formatDate(message.member.joinedAt, message.guild.id);
    const boosts = premiumSubscriptionCount;
    const boostLevel = premiumTier;
    const owner = (guild.owner && guild.owner.user.tag) || "error";
    const isVerified = verified ? lang.GUILD.IS_VERIFIED : lang.GUILD.NOT_VERIFIED;
    const isPartnered = partnered ? lang.GUILD.IS_PARTNERED : lang.GUILD.NOT_PARTNERED;
    const inviteBanner = guild.bannerURL({
      size: 2048,
      format: "png",
      dynamic: true,
    });

    const regionKey = guild.region;
    const regionData = regions.filter((region) => region.keys.includes(regionKey))[0];
    const region = `${regionData.flag ? regionData.flag : ""} ${toCapitalize(regionKey)}`;

    const verLevel = guild.verificationLevel;
    const mfaLevel = guild.mfaLevel;

    const embed = BaseEmbed(message)
      .setTitle(name)
      .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
      .addField(`**${lang.GUILD.OWNER}**`, owner, true)
      .addField(`**${lang.GUILD.ROLES_C}**`, roles, true)
      .addField(`**${lang.GUILD.CHANNEL_C}**`, channels, true)
      .addField(`**${lang.GUILD.EMOJI_C}**`, emojis, true)
      .addField(`**${lang.GUILD.MEMBER_C}**`, memberCount, true)
      .addField(`**${lang.MEMBER.CREATED_ON}**`, `${createdAt} (${tz})`, true)
      .addField(`**${lang.MEMBER.JOINED_AT}**`, `${joined} (${tz})`, true)
      .addField(`**${lang.GUILD.REGION}**`, region, true)
      .addField(`**${lang.GUILD.VERIFICATION}**`, verLevel, true)
      .addField(`**${lang.GUILD.MFA}**`, mfaLevel, true)
      .addField(`**${lang.GUILD.BOOSTS}**`, boosts, true)
      .addField(`**${lang.GUILD.BOOST_LVL}**`, boostLevel, true)
      .addField(`**${lang.GUILD.VERIFIED}**`, isVerified, true)
      .addField(`**${lang.GUILD.PARTNERED}**`, isPartnered, true)
      .setImage(inviteBanner);

    message.channel.send(embed);
  },
};
