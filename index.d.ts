import { Client } from "discord.js";

declare module "discord-starboards" {
  export interface StarboardOptions {
    storage?: string;
  }
  export default class StarboardsManager {
    starboards: any;

    constructor(client: Client, options: StarboardOptions) {
      super(client, options);
    }
  }
}

declare namespace NodeJS {
  export interface ProcessEnv {
    DISCORD_CLIENT_ID: string;
    DISCORD_CLIENT_SECRET: string;
    DISCORD_BOT_TOKEN: string;
    MONGO_DB_URI: string;
  }
}
