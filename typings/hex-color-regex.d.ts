declare module "hex-color-regex" {
  interface Options {
    strict?: boolean;
  }

  export default function hexColorRegex(opts?: Options): RegExp;
}
