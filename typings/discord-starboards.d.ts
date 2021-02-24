/* eslint-disable */
declare module "discord-starboards" {
  import { EventEmitter } from "events";
  import * as DJS from "discord.js";

  export interface StarboardOptions {
    storage?: string | boolean;
  }

  export interface Starboard {
    channelID: string;
    guildID: string;
    options: StarboardDefaultCreateOptions;
  }

  export interface StarboardDefaultCreateOptions {
    emoji: string;
    starBotMsg: boolean;
    selfStar: boolean;
    starEmbed: boolean;
    resolveImageUrl: boolean;
    attachments: boolean;
    threshold: number;
    color: string;
    allowNsfw: boolean;
  }

  export interface StarboardEvents {
    starboardCreate: [Starboard];
    starboardDelete: [Starboard];
    starboardReactionAdd: [string, DJS.Message, DJS.User];
    starboardReactionRemove: [string, DJS.Message, DJS.User];
    starboardReactionRemoveAll: [Message];
    starboardReactionNsfw: [string, DJS.Message, DJS.User];
    starboardNoSelfStar: [string, DJS.Message, DJS.User];
    starboardNoStarBot: [string, DJS.Message, DJS.User];
    starboardAlreadyStarred: [string, DJS.Message, DJS.User];
    starboardNoEmptyMsg: [string, DJS.Message, DJS.User];
    starboardEdited: [Starboard, Starboard];
  }

  export default class StarboardManager extends EventEmitter {
    constructor(client: DJS.Client, options?: StarboardOptions);

    public options: StarboardOptions;
    public defaultOptions: StarboardDefaultCreateOptions;
    public client: Client;
    public starboards: Starboard[];

    public create(
      channel: DJS.Channel,
      options?: Partial<StarboardDefaultCreateOptions>
    ): Promise<boolean | void>;
    public edit(
      channelID: DJS.Snowflake,
      emoji: string,
      data: Partial<StarboardDefaultCreateOptions>
    );
    public delete(channelID: DJS.Snowflake, emoji: string): Promise<boolean | void>;
    public async getAllStarboards(): Promise<Starboard[] | undefined>;
    public deleteStarboard(channelID: DJS.Snowflake, emoji: string): Promise<boolean | void>;
    public saveStarboard(data: Starboard): Promise<boolean | void>;
    public editStarboard(
      channelID: DJS.Snowflake,
      emoji: string,
      data: Partial<StarboardDefaultCreateOptions>
    ): Promise<boolean | void>;

    public on<E extends keyof StarboardEvents>(
      event: E,
      listener: (...args: StarboardEvents[E]) => void
    ): this;
    public once<K extends keyof StarboardEvents>(
      event: E,
      listener: (...args: StarboardEvents[E]) => void
    ): this;
    public emit<E extends keyof StarboardEvents>(
      event: EventEmitter,
      ...args: StarboardEvents[E]
    ): boolean;
  }
}
