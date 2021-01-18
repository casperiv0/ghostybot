/* eslint-disable no-unused-vars */
/* Definitions created by Dev-CasperTheGhost */
declare module "cowsay";
declare module "easy-games-js";

declare module "image-gen-discord" {
  import { Message } from "discord.js";

  export type Options = "embed" | "message" | "console";
  namespace ImageGen {
    export default class ImageGen {
      static cat(message: Message, options: Options): void;
      static dog(message: Message, options: Options): void;
      static alpaca(message: Message, options: Options): void;
      static lama(message: Message, options: Options): void;
      static meme(message: Message, options: Options): void;
      static joke(message: Message, options: Options): void;
      static seal(message: Message, options: Options): void;
      static camel(message: Message, options: Options): void;
    }
  }

  export = ImageGen;
}

declare module "word-definition" {
  interface ReturnData {
    word: string;
    category: string;
    definition: string;
    err?: string;
  }

  interface Options {
    exact?: boolean;
    hyperlinks?: "html" | "brackets" | "none";
    formatted?: boolean;
  }
  namespace Wd {
    export function getDef(
      word: string,
      language: string,
      options: Options | null,
      callback: (data: ReturnData) => void
    ): ReturnData;
  }

  export = Wd;
}

declare module "one-liner-joke" {
  interface Options {
    exclude_tags?: string[];
  }
  namespace Joke {
    export function getRandomJoke(opts: Options): { body: string };
  }

  export = Joke;
}

declare namespace NodeJS {
  export interface ProcessEnv {
    DISCORD_CLIENT_ID: string;
    DISCORD_CLIENT_SECRET: string;
    DISCORD_BOT_TOKEN: string;
    MONGO_DB_URI: string;
  }
}
