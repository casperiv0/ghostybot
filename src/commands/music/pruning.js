const { MessageEmbed } = require('discord.js');

const fs = require('fs');
let config;

try {
  config = require('../../config.json');
} catch (error) {
  config = null;
}

module.exports = {
  name: 'pruning',
  description: 'Toggle pruning of bot messages',
  category: 'music',
  execute(bot, message) {
    /* if (!config) return;
    config.PRUNING = !config.PRUNING;

    fs.writeFile('./config.json', JSON.stringify(config, null, 2), (err) => {
      if (err) {
        console.log(err);
        return message.channel.send('There was an error writing to the file.').catch(console.error);
      }

      return message.channel
        .send(`Message pruning is ${config.PRUNING ? '**enabled**' : '**disabled**'}`)
        .catch(console.error);
    }); */
    const avatar = message.author?.displayAvatarURL({ dynamic: true });
    const embed = new MessageEmbed()
    .setTitle('Woah! Something went wrong')
    .setDescription('The pruning command is currently under development and being optimized for multiple guilds. I apologize for any inconvenience')
    .setFooter(message.author?.username, avatar)
    .setColor('#7289DA')
    .setTimestamp();
    message.channel.send(embed);
  }
};
