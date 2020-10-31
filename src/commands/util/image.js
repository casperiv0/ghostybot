const cheerio = require("cheerio");
const request = require("request");
const { MessageEmbed } = require("discord.js");
module.exports = {
name: "image",
aliases: ["randomimage","imagesearch"],
description: "Search any image you want from google",
category: "util",
async execute(bot, message, args) {
const text = args.join(" ");
if (!text) return message.reply("What do you want me to search?");
var parts = message.content.split(" ");
var search = parts.slice(1).join(" ");
var options = {
url: "http://results.dogpile.com/serp?qc=images&q=" + search,
method: "GET",
headers: {
"Accept": "text/html",
"User-Agent": "Chrome"
}
};
request(options, function(error, response, responseBody) {
if (error) {

        return;
    }


    $ = cheerio.load(responseBody); 


    var links = $(".image a.link");


    var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));

    if (!urls.length) {
       
        return;
    }
  let pages = [urls[0]]
let page = 1;
const embed = new MessageEmbed()
.setColor('RANDOM')

.setImage(pages[page-1])
message.channel.send(embed)

}
)}
}
