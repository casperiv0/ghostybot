import { Client, Collection } from "discord.js";
import { Lyrics } from "@discord-player/extractor";
import NekoClient from "nekos.life";
import { Client as ImdbClient } from "imdb-api";
import PasteClient from "pastebin-api";
import AlexClient from "alexflipnote.js";
import { Player } from "discord-player";
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
  commands: Collection<string, Command>;
  aliases: Collection<string, string>;
  interactions: Collection<string, Interaction>;
  cooldowns: Collection<string, Collection<string, number>>;
  logger: typeof Logger;
  utils: Util;
  neko: NekoClient;
  imdb!: ImdbClient;
  player: Player;
  starboardsManager: MongStarboardsManager;
  giveawayManager: MongoGiveawayManager;
  alexClient!: AlexClient;
  pasteClient!: PasteClient;
  ctgs: CtgsClient;

  lyricsClient: {
    search: (query: string) => Promise<Lyrics.LyricsData>;
    client: unknown;
  };

  constructor() {
    super(discordConfig);

    this.commands = new Collection();
    this.aliases = new Collection();
    this.interactions = new Collection();
    this.cooldowns = new Collection();
    this.logger = Logger;
    this.utils = new Util(this);
    this.neko = new NekoClient();

    if (process.env["ALEXFLIPNOTE_API_KEY"]) {
      this.alexClient = new AlexClient(process.env["ALEXFLIPNOTE_API_KEY"]);
    }

    if (process.env["PASTE_CLIENT_KEY"]) {
      this.pasteClient = new PasteClient(process.env["PASTE_CLIENT_KEY"]);
    }

    if (process.env["IMDB_KEY"]) {
      this.imdb = new ImdbClient({ apiKey: process.env["IMDB_KEY"] });
    }

    this.player = new Player(this, {
      autoSelfDeaf: true,
      enableLive: false,
      leaveOnStop: true,
      ytdlDownloadOptions: {
        filter: "audioonly",
      },
    });

    this.ctgs = new CtgsClient();
    this.lyricsClient = Lyrics.init();

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
