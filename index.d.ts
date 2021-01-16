declare module "discord-starboards";
declare module "image-gen-discord";
declare module "cowsay";
declare module "easy-games-js";

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
