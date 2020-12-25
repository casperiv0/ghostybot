module.exports = (client) => {
    const channelId = '757625607814381599';

    const updateMembers = async (guild) => {
      // const mchannel = await getMemberCountChannel(guild.id);
      const channel = guild.channels.cache.get(channelId);
      if (channel == undefined) return;
      channel.setName(`Members: ${guild.memberCount.toLocaleString()}`);
    };

    client.on('guildMemberAdd', (member) => updateMembers(member.guild));
    client.on('guildMemberRemove', (member) => updateMembers(member.guild));
    // const guildID = '668863930692665345';
    client.guilds.cache.forEach(guild => {
        updateMembers(guild);
    });
    // updateMembers(client.guilds.cache.get(guildID));
  };