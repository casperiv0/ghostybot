/* eslint-disable no-unused-vars */
/* Definitions created by Dev-CasperTheGhost */
declare module "discord-starboards";
declare module "image-gen-discord";
declare module "cowsay";
declare module "easy-games-js";

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
