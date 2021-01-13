import { Client, Collection } from "discord.js";
import CommandHandler from "../modules/CommandHandler";
import EventHandler from "../modules/EventHandler";
import HelperHandler from "../modules/HelperHandler";
import Command from "./Command";
import Logger from "../modules/Logger";
import Util from "../utils/Util";
import config from "../../config.json";

class Bot extends Client {
  commands: Collection<string, Command>;
  aliases: Collection<string, string>;
  logger: typeof Logger;
  utils: Util;
  config: typeof config;

  constructor() {
    super({
      disableMentions: "everyone",
      partials: ["GUILD_MEMBER", "MESSAGE", "USER", "REACTION"],
      restRequestTimeout: 25000,
    });

    this.commands = new Collection();
    this.aliases = new Collection();
    this.logger = Logger;
    this.utils = new Util(this);
    this.config = config;

    new CommandHandler(this).loadCommands();
    new EventHandler(this).loadEvents();
    new HelperHandler(this).loadHelpers();
  }
}

export default Bot;
