const wiki = require("wikijs").default();
const { MessageEmbed } = require('discord.js');
module.exports = {
  name: "wiki",
  aliases: ["wikipediasearch", "wikipedia"],
  category: "util",
  description: "",
  async execute(bot, message, args) {
    if (!args[0]) return message.channel.send("You must enter something to search!")
        let result;
        const search = await wiki.search(args.join(' '));
        result = await wiki.page(search.results[0]);
            let description = await result.summary();  
                const embed = new MessageEmbed()
                    .setDescription(`${description.slice(0, 2048)}`)
               message.channel.send('', embed)
    }
};
