import { Client, Collection } from "discord.js";
import NekoClient from "nekos.life";
import { Client as ImdbClient } from "imdb-api";
import PasteClient from "pastebin-api";
import AlexClient from "alexflipnote.js";
import { Player } from "discord-player";
import CommandHandler from "../modules/CommandHandler";
import EventHandler from "../modules/EventHandler";

import MongStarboardsManager from "../modules/StarboardsManager";
import MongoGiveawayManager from "../modules/GiveawayManager";
import Command from "./Command";
import Logger from "../modules/Logger";
import Util from "../utils/Util";

class Bot extends Client {
  commands: Collection<string, Command>;
  aliases: Collection<string, string>;
  cooldowns: Collection<string, Collection<string, number>>;
  logger: typeof Logger;
  utils: Util;
  neko: NekoClient;
  imdb: ImdbClient;
  alexClient: AlexClient;
  player: Player;
  starboardsManager: MongStarboardsManager;
  giveawayManager: MongoGiveawayManager;
  pasteClient: PasteClient;

  constructor() {
    super({
      intents: [
        "GUILDS",
        "GUILD_BANS",
        "GUILD_EMOJIS",
        "GUILD_INTEGRATIONS",
        "GUILD_INVITES",
        "GUILD_MEMBERS",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_MESSAGE_TYPING",
        "GUILD_VOICE_STATES",
        "GUILD_WEBHOOKS",
      ],
      partials: ["GUILD_MEMBER", "MESSAGE", "USER", "REACTION", "CHANNEL"],
      restRequestTimeout: 25000,
      allowedMentions: { parse: ["roles", "users", "everyone"] },
    });

    this.commands = new Collection();
    this.aliases = new Collection();
    this.cooldowns = new Collection();
    this.logger = Logger;
    this.utils = new Util(this);
    this.neko = new NekoClient();
    this.imdb = new ImdbClient({ apiKey: process.env["IMDB_KEY"] });
    this.alexClient = new AlexClient(process.env["ALEXFLIPNOTE_API_KEY"]);
    this.pasteClient = new PasteClient(process.env["PASTE_CLIENT_KEY"]);
    this.player = new Player(this, {
      autoSelfDeaf: true,
      leaveOnEmpty: true,
      leaveOnEnd: true,
      leaveOnStop: true,
      quality: "high",
    });
    this.starboardsManager = new MongStarboardsManager(this, {
      storage: false,
      translateClickHere: "Jump to message",
    });
    this.giveawayManager = new MongoGiveawayManager(this, {
      hasGuildMembersIntent: true,
      updateCountdownEvery: 10000,

      default: {
        embedColor: "#7289DA",
        botsCanWin: false,
        reaction: "🎉",
        embedColorEnd: "#7289DA",
      },
    });

    new CommandHandler(this).loadCommands();
    new EventHandler(this).loadEvents();
  }
}

export default Bot;
