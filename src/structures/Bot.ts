import { Client, Collection } from "discord.js";
import NekoClient from "nekos.life";
import TnaiClient from "tnai";
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
  tnai: TnaiClient;
  imdb: ImdbClient;
  alexClient: AlexClient;
  player: Player;
  starboardsManager: MongStarboardsManager;
  giveawayManager: MongoGiveawayManager;

  constructor() {
    super({
      disableMentions: "everyone",
      partials: ["GUILD_MEMBER", "MESSAGE", "USER", "REACTION"],
      restRequestTimeout: 25000,
    });

    this.commands = new Collection();
    this.aliases = new Collection();
    this.cooldowns = new Collection();
    this.logger = Logger;
    this.utils = new Util(this);
    this.config = config;
    this.neko = new NekoClient();
    this.tnai = new TnaiClient();
    this.imdb = new ImdbClient({ apiKey: this.config.imdbKey });
    this.alexClient = new AlexClient(this.config.alexflipnoteKey);
    this.player = new Player(this, {
      autoSelfDeaf: true,
      leaveOnEmpty: true,
      leaveOnEmptyCooldown: 60,
      leaveOnEnd: false,
      leaveOnStop: false,
    });
    this.starboardsManager = new MongStarboardsManager(this, {
      storage: false
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
