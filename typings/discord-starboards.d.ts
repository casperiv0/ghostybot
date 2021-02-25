/* eslint-disable */
declare module "discord-starboards" {
  import { EventEmitter } from "events";
  import * as DJS from "discord.js";

  export type TranslateClick = (msg: DJS.Message) => void;

  export interface StarboardOptions {
    storage?: string | boolean;
    translateClickHere?: string | TranslateClick;
  }

  export interface Starboard {
    channelID: string;
    guildID: string;
    options: StarboardDefaultCreateOptions;
  }

  export interface ColorOptions {
    colors: DJS.ColorResolvable[];
    max: number;
  }

  export interface StarboardDefaultCreateOptions {
    emoji: string;
    starBotMsg: boolean;
    selfStar: boolean;
    starEmbed: boolean;
    resolveImageUrl: boolean;
    attachments: boolean;
    threshold: number;
    color: string | ColorOptions;
    allowNsfw: boolean;
  }

  export interface StarboardEvents {
    starboardCreate: [Starboard];
    starboardDelete: [Starboard];
    starboardReactionAdd: [string, DJS.Message, DJS.User];
    starboardReactionRemove: [string, DJS.Message, DJS.User];
    starboardReactionRemoveAll: [DJS.Message];
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
    public client: DJS.Client;
    public starboards: Starboard[];

    public create(
      channel: DJS.Channel,
      options?: Partial<StarboardDefaultCreateOptions>
    ): Promise<boolean>;

    public edit(
      channelID: DJS.Snowflake,
      emoji: string,
      data: Partial<StarboardDefaultCreateOptions>
    ): Promise<Starboard | undefined>;

    public delete(channelID: DJS.Snowflake, emoji: string): Promise<boolean>;
    public getAllStarboards(): Promise<Starboard[] | undefined>;
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
    public once<E extends keyof StarboardEvents>(
      event: E,
      listener: (...args: StarboardEvents[E]) => void
    ): this;
    public emit<E extends keyof StarboardEvents>(event: E, ...args: StarboardEvents[E]): boolean;
  }

  export class Starboard {
    public channelID: DJS.Snowflake;
    public guildID: DJS.Snowflake;
    public options: StarboardDefaultCreateOptions;
    public manager: StarboardManager;

    constructor(
      channelID: DJS.Snowflake,
      guildID: DJS.Snowflake,
      options: StarboardDefaultCreateOptions,
      manager: StarboardManager
    );

    leaderboard(count: number): DJS.Message[];
    toObject(): Starboard;
    edit(options: Partial<StarboardDefaultCreateOptions>): Promise<Starboard>;
  }
}
