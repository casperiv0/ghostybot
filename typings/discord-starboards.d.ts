/* eslint-disable no-unused-vars */
declare module "discord-starboards" {
  import { EventEmitter } from "events";
  import { Client, Channel, Snowflake } from "discord.js";

  export interface StarboardClientOptions {
    storage?: string | boolean;
  }

  export interface StarboardOptions {
    emoji: string;
    starBotMsg: boolean;
    selfStar: boolean;
    starEmbed: boolean;
    attachments: boolean;
    resolveImageUrl: boolean;
    threshold: string;
    color: string;
    allowNsfw: boolean;
  }

  export interface Starboard {
    channelID: string;
    guildID: string;
    options: StarboardOptions;
  }

  namespace DiscordStarboards {
    export default class StarboardManager extends EventEmitter {
      constructor(client: Client, options?: StarboardClientOptions);

      public defaultOptions: StarboardOptions;
      public client: Client;
      public starboards: Starboard[];

      public create(channel: Channel, options?: Partial<StarboardOptions>): Promise<boolean | void>;
      public delete(channelID: Snowflake, emoji: string): Promise<boolean | void>;
      public getAllStarboards(): Promise<Starboard[]>;
      public deleteStarboard(channelID: Snowflake, emoji: string): Promise<boolean | void>;
      public saveStarboard(data: Starboard): Promise<boolean | void>;
    }
  }

  export = DiscordStarboards;
}
