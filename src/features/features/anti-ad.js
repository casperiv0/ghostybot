module.exports = (client) => {
    const isInvite = async (guild, code) => {
      return await new Promise((resolve) => {
        guild.fetchInvites().then((invites) => {
          for (const invite of invites) {
            if (code === invite[0]) {
              resolve(true);
              return;
            }
          }

          resolve(false);
        });
      });
    };

    client.on('message', async (message) => {
      const { guild, content } = message;

      // discord.gg/23RAN4

      const code = content.split('discord.gg/')[1];

      if (content.includes('discord.gg/')) {
        const isOurInvite = await isInvite(guild, code);
        if (!isOurInvite) {
          message.delete();
          message.channel.send('**Please no advertising**').then(async msg => {
              await msg.delete({ timeout: 5000 });
          });
        }
      }
    });
    client.on('message', async message => {
      if (message.author.bot) return;
      const regex = /(https?:\/\/)?(www\.)?(discord\.(io|me|li|club)|discordapp\.com\/invite|discord\.com\/invite)\/.+[a-z]/gi;
      if (regex.exec(message.content)) {
        await message.delete({ timeout: 1000 });
          await message.channel.send(
            `${message.author} **you cannot post other links here!**`,
          );
      }
    });
};