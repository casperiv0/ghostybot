const { MessageEmbed } = require("discord.js")
const client = require("nekos.life")
const neko = new client()
module.exports = {
    name: "wallpaper",
    description: "good wallpapers xD",
    category: "image",
    async execute (bot, message) {
        async function work() {
            let owo = await neko.sfw.wallpaper()

            let embed = new MessageEmbed()
            .setTitle(`OOO a wallpaper nice`)
            .setImage(owo.url)

            message.channel.send(embed)
        }
        work()
    }
}