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
