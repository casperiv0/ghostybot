const ytld = require("ytdl-core");
const { youtubeApiKey } = require("../../../config.json");
const YtApi = require("simple-youtube-api");
const { MessageEmbed } = require("discord.js");
const youtube = new YtApi(youtubeApiKey);

module.exports = {
  name: "play",
  description: "Play a song",
  aliases: ["p"],
  category: "music",
  usage: "play <youtube link | song name>",
  async execute(bot, message, args, serverQueue, queue) {
    const voiceChannel = message.member.voice.channel;
    const search = args[0];

    if (!search) {
      return message.channel.send("Please provide a search query");
    }

    if (!voiceChannel) {
      return message.channel.send(
        "You need to be in a voice channel to play music"
      );
    }

    const perms = voiceChannel.permissionsFor(message.client.user);

    if (!perms.has("CONNECT") || !perms.has("SPEAK")) {
      return message.channel.send(
        "I don't have the correct permissions for that voice channel!"
      );
    }

    let song = null;
    let songInfo = null;

    // check if URL
    // eslint-disable-next-line no-useless-escape
    try {
      if (
        new RegExp(
          /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi
        ).test(args.join(" "))
      ) {
        songInfo = await ytld.getInfo(args.join(" "));
        song = {
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url,
        };
      } else {
        const results = await youtube.searchVideos(args.join(" "), 1);
        songInfo = await ytld.getInfo(results[0].url);
        song = {
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url,
          duration: songInfo.videoDetails.lengthSeconds,
          uploadedBy: songInfo.videoDetails.author.name,
          uploadedAt: songInfo.videoDetails.uploadDate,
          views: songInfo.videoDetails.viewCount
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
          likes: songInfo.videoDetails.likes
            ?.toString()
            ?.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
          dislikes: songInfo.videoDetails.dislikes
            ?.toString()
            ?.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
          videoId: songInfo.videoDetails.videoId,
          requestedBy: message.author,
        };
      }
    } catch (e) {
      console.log(e);
      return message.channel.send(
        "There was an error getting the song details"
      );
    }

    if (!serverQueue || serverQueue.songs.length <= 0) {
      const queueContruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 3,
        playing: true,
        nowPlaying: null,
      };

      queue.set(message.guild.id, queueContruct);

      queueContruct.songs.push(song);

      try {
        const connection = await voiceChannel.join();
        queueContruct.connection = connection;

        queueContruct.nowPlaying = queueContruct.songs[0];
        play(message.guild, queueContruct.songs[0], queue);
      } catch (e) {
        console.log(e);
        return message.channel.send(
          "There was an error when joining the voice channel"
        );
      }
    } else {
      serverQueue.songs.push(song);
      const embed = new MessageEmbed()
        .setTitle(song.title)
        .setURL(song.url)
        .setAuthor(
          `Song has been added to the queue | ${
            serverQueue.songs.length - 1
          } songs in queue`
        )
        .setImage(song.thumbnail)
        .setColor("BLUE")
        .setDescription(`Duration: ${song.duration}s`)
        .setFooter(`Requested by ${song.requestedBy.username}`);

      serverQueue.textChannel.send({ embed });
    }
  },
};

function play(guild, song, queue) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }
  serverQueue.nowPlaying = serverQueue.songs[0];

  const dispatcher = serverQueue.connection
    .play(ytld(song.url), { bitrate: 96 })
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0], queue);
    })
    .on("error", (e) => console.log(e));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.connection.voice.setSelfDeaf(true);

  const embed = new MessageEmbed()
    .setTitle(song.title)
    .setURL(song.url)
    .setAuthor("🎵 Now playing:")
    .setImage(`https://i.ytimg.com/vi/${song.videoId}/hqdefault.jpg`)
    .setColor("BLUE")
    .setDescription(`Requested by ${song.requestedBy}`)
    .setFooter(
      `Duration : ${song.duration} Seconds | Looping : ${
        serverQueue.loop ? "Enabled" : "Disabled"
      } \nVolume : ${serverQueue.volume * 10}%`
    );

  serverQueue.textChannel.send({ embed });
}
