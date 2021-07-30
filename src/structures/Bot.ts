import { Client, Collection } from "discord.js";
import { Lyrics } from "@discord-player/extractor";
import NekoClient from "nekos.life";
import { Client as ImdbClient } from "imdb-api";
import PasteClient from "pastebin-api";
import AlexClient from "alexflipnote.js";
import DistubePlayer from "distube";
import { CtgsClient } from "ctgs.js";
import EventHandler from "handlers/EventHandler";

import MongStarboardsManager from "handlers/StarboardsManager";
import MongoGiveawayManager from "handlers/GiveawayManager";
import Command from "./Command";
import Logger from "utils/Logger";
import Util from "utils/Util";
import Interaction from "./Interaction";
import { discordConfig } from "@config/discord-config";

class Bot extends Client {
  commands: Collection<string, Command> = new Collection();
  aliases: Collection<string, string> = new Collection();
  interactions: Collection<string, Interaction> = new Collection();
  cooldowns: Collection<string, Collection<string, number>> = new Collection();

  logger: typeof Logger = Logger;
  utils: Util;
  neko: NekoClient = new NekoClient();
  imdb!: ImdbClient;
  player: DistubePlayer;
  starboardsManager: MongStarboardsManager;
  giveawayManager: MongoGiveawayManager;
  alexClient!: AlexClient;
  pasteClient!: PasteClient;
  ctgs: CtgsClient = new CtgsClient();

  lyricsClient: {
    search: (query: string) => Promise<Lyrics.LyricsData>;
    client: unknown;
  } = Lyrics.init();

  constructor() {
    super(discordConfig);

    this.utils = new Util(this);

    if (process.env["ALEXFLIPNOTE_API_KEY"]) {
      this.alexClient = new AlexClient(process.env["ALEXFLIPNOTE_API_KEY"]);
    }

    if (process.env["PASTE_CLIENT_KEY"]) {
      this.pasteClient = new PasteClient(process.env["PASTE_CLIENT_KEY"]);
    }

    if (process.env["IMDB_KEY"]) {
      this.imdb = new ImdbClient({ apiKey: process.env["IMDB_KEY"] });
    }

    this.player = new DistubePlayer(this, {
      leaveOnEmpty: true,
      nsfw: false,
      leaveOnFinish: true,
      customFilters: {
        cursed: "vibrato=f=6.5,tremolo,aresample=48000,asetrate=48000*1.25",
      },

      ytdlOptions: {
        filter: "audioonly",
      },
    });

    // @ts-expect-error ignore
    this.starboardsManager = new MongStarboardsManager(this, {
      storage: false,
      translateClickHere: "Jump to message",
    });

    this.giveawayManager = new MongoGiveawayManager(this, {
      updateCountdownEvery: 10000,
      storage: undefined,
      default: {
        embedColor: "#5865f2",
        botsCanWin: false,
        reaction: "🎉",
        embedColorEnd: "#5865f2",
      },
    });

    new EventHandler(this).loadEvents();
  }
}

export default Bot;
