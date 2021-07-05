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
