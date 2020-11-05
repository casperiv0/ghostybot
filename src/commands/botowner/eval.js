const Discord = require("discord.js")

module.exports = {
  name: "eval",
  description: "Eval",
  category: "botowner",
  ownerOnly: true,
  aliases: ["e"],
  async execute(bot, message, args) {
    const toEval = args.join(" ")
   try {
    let evaled = await eval(toEval);
    let eevaled = typeof evaled;
    evaled = require("util").inspect(evaled, { depth: 0, maxArrayLength: null });
    const type = eevaled[0].toUpperCase() + eevaled.slice(1)

    const embed = new Discord.MessageEmbed()
  .setTitle("Eval Command")
  .setDescription(`\`Type:\` ${type}
\`Input:\` \`\`\`js\n${toEval} \`\`\`
\`Output:\` \`\`\`js\n${evaled}\`\`\``)
  
  message.channel.send(embed)
  } catch(error) {
    
  const errorEmbed = new Discord.MessageEmbed()
  .setTitle("Eval Command")
  .setDescription(`\`\`\`${error}\`\`\``)
    
  message.channel.send(errorEmbed)
    }
  },
};
