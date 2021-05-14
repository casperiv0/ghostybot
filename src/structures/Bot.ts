import { Client, Collection, Intents } from "discord.js";
import NekoClient from "nekos.life";
import { Client as ImdbClient } from "imdb-api";
import PasteClient from "pastebin-api";
import AlexClient from "alexflipnote.js";
import { Player } from "discord-player";
import EventHandler from "../modules/EventHandler";

import MongStarboardsManager from "../modules/StarboardsManager";
import MongoGiveawayManager from "../modules/GiveawayManager";
import Command from "./Command";
import Logger from "../modules/Logger";
import Util from "../utils/Util";
import Interaction from "./Interaction";
import { Lyrics } from "@discord-player/extractor";

class Bot extends Client {
  commands: Collection<string, Command>;
  aliases: Collection<string, string>;
  interactions: Collection<string, Interaction>;
  cooldowns: Collection<string, Collection<string, number>>;
  logger: typeof Logger;
  utils: Util;
  neko: NekoClient;
  imdb: ImdbClient;
  player: Player;
  starboardsManager: MongStarboardsManager;
  giveawayManager: MongoGiveawayManager;
  alexClient!: AlexClient;
  pasteClient!: PasteClient;
  lyricsClient: {
    /* eslint-disable-next-line no-unused-vars */
    search: (query: string) => Promise<Lyrics.LyricsData>;
    client: unknown;
  };

  constructor() {
    super({
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_WEBHOOKS,
      ],
      partials: ["GUILD_MEMBER", "MESSAGE", "USER", "REACTION", "CHANNEL"],
      restRequestTimeout: 25000,
      allowedMentions: { parse: ["roles", "users"] },
    });

    this.commands = new Collection();
    this.aliases = new Collection();
    this.interactions = new Collection();
    this.cooldowns = new Collection();
    this.logger = Logger;
    this.utils = new Util(this);
    this.neko = new NekoClient();
    this.imdb = new ImdbClient({ apiKey: process.env["IMDB_KEY"] });

    if (process.env["ALEXFLIPNOTE_API_KEY"]) {
      this.alexClient = new AlexClient(process.env["ALEXFLIPNOTE_API_KEY"]);
    }

    if (process.env["PASTE_CLIENT_KEY"]) {
      this.pasteClient = new PasteClient(process.env["PASTE_CLIENT_KEY"]);
    }

    this.player = new Player(this, {
      autoSelfDeaf: true,
      leaveOnEmpty: true,
      leaveOnEnd: true,
      leaveOnStop: true,
    });

    this.lyricsClient = Lyrics.init();

    this.starboardsManager = new MongStarboardsManager(this, {
      storage: false,
      translateClickHere: "Jump to message",
    });
    this.giveawayManager = new MongoGiveawayManager(this, {
      hasGuildMembersIntent: true,
      updateCountdownEvery: 10000,

      default: {
        embedColor: "#5865f2",
        botsCanWin: false,
        reaction: "🎉",
        embedColorEnd: "#5865f2",
      },
    });

    // new CommandHandler(this).loadCommands();
    new EventHandler(this).loadEvents();
  }
}

export default Bot;
