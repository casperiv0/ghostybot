import { Client, Collection } from "discord.js";
import NekoClient from "nekos.life";
import { Client as ImdbClient } from "imdb-api";
import PasteClient from "pastebin-api";
import AlexClient from "alexflipnote.js";
import DistubePlayer from "distube";
import { CtgsClient } from "ctgs.js";
import { EventHandler } from "handlers/EventHandler";

import { MongoStarboardsManager } from "handlers/StarboardsManager";
import { MongoGiveawayManager } from "handlers/GiveawayManager";
import { Command } from "./Command";
import { logger } from "utils/logger";
import { Util } from "utils/Util";
import { discordConfig } from "@config/discord-config";
import { SubCommand } from "./Command/SubCommand";
import { Command as InteractionCommand } from "./Command/Command";

export class Bot extends Client {
  commands: Collection<string, Command> = new Collection();
  aliases: Collection<string, string> = new Collection();
  interactions: Collection<string, SubCommand | InteractionCommand> = new Collection();
  cooldowns: Collection<string, Collection<string, number>> = new Collection();

  logger: typeof logger = logger;
  utils: Util;
  neko: NekoClient = new NekoClient();
  imdb!: ImdbClient;
  player: DistubePlayer;
  starboardsManager: MongoStarboardsManager;
  giveawayManager: MongoGiveawayManager;
  alexClient!: AlexClient;
  pasteClient!: PasteClient;
  ctgs: CtgsClient = new CtgsClient();

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
    this.starboardsManager = new MongoStarboardsManager(this, {
      storage: false,
      translateClickHere: "Jump to message",
    });

    // @ts-expect-error ignore
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
