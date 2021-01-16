declare module "discord-starboards";
declare module "image-gen-discord";
declare module "cowsay";

declare namespace NodeJS {
  export interface ProcessEnv {
    DISCORD_CLIENT_ID: string;
    DISCORD_CLIENT_SECRET: string;
    DISCORD_BOT_TOKEN: string;
    MONGO_DB_URI: string;
  }
}
