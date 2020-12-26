module.exports = (client) => {
    const channelId = '';

    const updateMembers = async (guild) => {
      // const mchannel = await getMemberCountChannel(guild.id);
      const channel = guild.channels.cache.get(channelId);
      if (channel == undefined) return;
      channel.setName(`Members: ${guild.memberCount.toLocaleString()}`);
    };

    client.on('guildMemberAdd', (member) => updateMembers(member.guild));
    client.on('guildMemberRemove', (member) => updateMembers(member.guild));
    // const guildID = '';
    client.guilds.cache.forEach(guild => {
        updateMembers(guild);
    });
    // updateMembers(client.guilds.cache.get(guildID));
  };