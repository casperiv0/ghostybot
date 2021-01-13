const fetch = require('node-fetch')
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
    name: 'country',
    description: 'Get information about a country',
    usage: '<country>',
    category: 'util',
    requiredArgs: ["country"],
    async execute(bot, message, args) {
        const lang = await bot.utils.getGuildLang(message.guild.id);
        const query = args.join(" ");
        const country = await fetch("https://restcountries.eu/rest/v2/name/" + encodeURIComponent(query)).then(r => r.json());
        if(country.message) return message.channel.send(lang.COVID.NOT_FOUND);

        const name = country[0].name;
        const nativeName = country[0].nativeName;
        const domains = country[0].topLevelDomain;
        const callingCodes = country[0].callingCodes;
        const alphaCode = country[0].alpha2Code;
        const capital = country[0].capital;
        const timezones = country[0].timezones;
        const region = country[0].region;
        const flag = `https://www.countryflags.io/${alphaCode}/flat/64.png` || "";
        let languages = '';
        country[0].languages.forEach(lang => {
            languages += `${lang.name}\n`
        });

        const embed = BaseEmbed(message)
            .setAuthor(name)
            .setTitle(nativeName)
            .addField(lang.UTIL.ALPHA_CODE, alphaCode, true)
            .addField(lang.UTIL.CALLING_CODES, callingCodes, true)
            .addField(lang.GUILD.REGION, region, true)
            .addField(lang.UTIL.DOMAINS, domains, true)
            .addField(lang.UTIL.CAPITAL, capital, true)
            .addField(lang.UTIL.DB_LANGS, languages, true)
            .addField(lang.UTIL.TIMEZONES, timezones, false)
            .setThumbnail(flag);

        message.channel.send(embed);
    },
}
