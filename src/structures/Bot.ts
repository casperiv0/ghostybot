import { Client, Collection } from "discord.js";
import NekoClient from "nekos.life";
import { Client as ImdbClient } from "imdb-api";
import AlexClient from "alexflipnote.js";
import { Player } from "discord-player";
import CommandHandler from "../modules/CommandHandler";
import EventHandler from "../modules/EventHandler";

import MongStarboardsManager from "../modules/StarboardsManager";
import MongoGiveawayManager from "../modules/GiveawayManager";
import Command from "./Command";
import Logger from "../modules/Logger";
import Util from "../utils/Util";
import config from "../../config.json";

class Bot extends Client {
  commands: Collection<string, Command>;
  aliases: Collection<string, string>;
  cooldowns: Collection<string, Collection<string, number>>;
  logger: typeof Logger;
  utils: Util;
  config: typeof config;
  neko: NekoClient;
  imdb: ImdbClient;
  alexClient: AlexClient;
  player: Player;
  starboardsManager: MongStarboardsManager;
  giveawayManager: MongoGiveawayManager;

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
    });

    this.commands = new Collection();
    this.aliases = new Collection();
    this.cooldowns = new Collection();
    this.logger = Logger;
    this.utils = new Util(this);
    this.config = config;
    this.neko = new NekoClient();
    this.imdb = new ImdbClient({ apiKey: this.config.imdbKey });
    this.alexClient = new AlexClient(this.config.alexflipnoteKey);
    this.player = new Player(this, {
      autoSelfDeaf: true,
      leaveOnEmpty: true,
      leaveOnEnd: true,
      leaveOnStop: true,
      quality: "high",
    });
    this.starboardsManager = new MongStarboardsManager(this, {
      storage: false,
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
