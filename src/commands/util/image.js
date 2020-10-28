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
        if (!text) return message.reply("Please enter something to search");
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
      let pages = [urls[0],urls[1],urls[2],urls[3],urls[4],urls[5]]
	let page = 1;



 const embed = new MessageEmbed()
	.setColor('RANDOM')
	.setFooter(` Page  ${page}/ ${pages.length}  Google Image Search Results (English)`)
	.setImage(pages[page-1])


	message.channel.send(embed).then(msg => {

		msg.react('⏮').then( r => {
			msg.react('⬅')
		.then(() => msg.react('⏹'))
		.then(() => msg.react('➡'))
		.then(() => msg.react('⏭'))

			let backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id;
			let forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id;

			let sbackwardsFilter = (reaction, user) => reaction.emoji.name === '⏮' && user.id === message.author.id;
			let sforwardsFilter = (reaction, user) => reaction.emoji.name === '⏭' && user.id === message.author.id;

			let cancelFilter = (reaction, user) => reaction.emoji.name === '⏹' && user.id === message.author.id;

			let backwards = msg.createReactionCollector(backwardsFilter, { time: 0 });
			let forwards = msg.createReactionCollector(forwardsFilter, { time: 0 });

			let sbackwards = msg.createReactionCollector(sbackwardsFilter, { time: 0 });
			let sforwards = msg.createReactionCollector(sforwardsFilter, { time: 0 });

			let cancel = msg.createReactionCollector(cancelFilter, { time: 0 });
// Baby Kultz#6192
			backwards.on('collect', r => {
				if (page === 1) return;
				page--;
				embed.setImage(pages[page-1]);
				embed.setFooter(` Page  ${page}/ ${pages.length}  Google Image Search Results (English)`)
				msg.edit(embed)
			})
			forwards.on('collect', r => {
				if (page === pages.length) return;
				page++;
				embed.setImage(pages[page-1]);
				embed.setFooter(` Page  ${page}/ ${pages.length}  Google Image Search Results (English)`)
				msg.edit(embed)
			})
			sbackwards.on('collect', r => {
				if (page === 1) return;
				page = 1;
				embed.setImage(pages[page-1]);
				embed.setFooter(` Page  ${page}/ ${pages.length}  Google Image Search Results (English)`)
				msg.edit(embed)
			})
			sforwards.on('collect', r => {
				if (page === pages.length) return;
				page = 6; 
				embed.setImage(pages[page-1]);
				embed.setFooter(` Page  ${page}/ ${pages.length}  Google Image Search Results (English)`)
				msg.edit(embed)
			})
			cancel.on('collect', r => {
				embed.setDescription(`Closing the menu..`);
				embed.setImage('');
				embed.setFooter(`Menu will close after 3sec`)
				msg.edit(embed).then(msg => {
            msg.delete({ timeout: 3000 })
			})
        })
		})
	})
      }
            
  
   
            )}
  }
