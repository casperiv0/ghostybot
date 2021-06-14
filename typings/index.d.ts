/* definitions created by Dev-CasperTheGhost */

declare module "easy-games-js";

declare module "cowsay" {
  export interface SayOptions {
    text: string;
    T?: string;
    e?: string;
  }

  namespace CowSay {
    export function say(options: SayOptions);
  }

  export = CowSay;
}

declare module "image-gen-discord" {
  import * as DJS from "discord.js";

  export type Options = "embed" | "message" | "console";
  namespace ImageGen {
    export default class ImageGen {
      static cat(message: DJS.Message, options: Options): void;
      static dog(message: DJS.Message, options: Options): void;
      static alpaca(message: DJS.Message, options: Options): void;
      static lama(message: DJS.Message, options: Options): void;
      static meme(message: DJS.Message, options: Options): void;
      static joke(message: DJS.Message, options: Options): void;
      static seal(message: DJS.Message, options: Options): void;
      static camel(message: DJS.Message, options: Options): void;
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
      callback: (data: ReturnData) => void,
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
