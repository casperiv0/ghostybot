// message resoponses
module.exports = (client) => {
	client.on('message', async (message) => {

		//	no u message response
		if (message.content.includes('no u')) {
			if (message.author.bot) return;
			message.channel.send('no u');
		}

	});
};