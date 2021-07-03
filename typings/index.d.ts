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
