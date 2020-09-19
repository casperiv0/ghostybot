const { MessageEmbed } = require("discord.js");
const client = require('nekos.life');
const neko = new client();
module.exports = {
    name: "pussy",
    description: "None",
    category: "nsfw",
    async execute(bot, message) {
        async function work() {
            let owo = (await neko.nsfw.pussy());
    
            const blowjob = new Discord.MessageEmbed()
            .setTitle("Blowjob")
            .setImage(owo.url)
            .setColor(`#FF0000`)
            .setURL(owo.url);
            message.channel.send(blowjob);
    
    }
    
          work();
    }
};